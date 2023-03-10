import { ReWaListItemType } from "@/components/ReWaList";
import { Database } from "@/lib/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { rawBookToReWaLiItem } from "./googleBooksUtil";
import { rawVideoToReWaLiItem } from "./imdbUtils";

export async function getRewalist(userId: string, supabase: SupabaseClient<Database>): Promise<ReWaListItemType[]> {
  const [booksRes, videoRes] = await Promise.all([
    supabase.from('user_reading_list').select(`
      book_id (
        id,
        created_at,
        updated_at,
        title,
        subtitle,
        description,
        isbn10,
        isbn13,
        cover,
        release_year,
        authors
      )
    `, { count: "exact" })
      .eq('user_id', userId),
    supabase.from('user_watching_list').select(`
      video_id (
        id,
        created_at,
        updated_at,
        title,
        description,
        image,
        cast_members,
        genres,
        release_year
      )
    `, { count: "exact" })
      .eq('user_id', userId),
  ])

  if (booksRes.error) throw new Error(booksRes.error.message)
  if (videoRes.error) throw new Error(videoRes.error.message)

  return [
    ...(booksRes.data || []).map(d => rawBookToReWaLiItem(d.book_id as DatabaseBookType)),
    ...(videoRes.data || []).map(d => rawVideoToReWaLiItem(d.video_id as DatabaseVideoType)),
  ].sort((a, b) => a.title.localeCompare(b.title, 'en'))
}

export type DatabaseBookType = Database['public']['Tables']['books']['Row']
export type DatabaseVideoType = Database['public']['Tables']['videos']['Row']
export type BookWithoutAutogeneratedType = Omit<DatabaseBookType, 'id' | 'updated_at' | 'created_at'>
export type VideoWithoutAutogeneratedType = Omit<DatabaseVideoType, 'id' | 'updated_at' | 'created_at'>

export async function addBookToRewalist(
  userId: string,
  book: BookWithoutAutogeneratedType,
  supabase: SupabaseClient<Database>
): Promise<DatabaseBookType> {
  const creation = await supabase
    .from('books')
    .insert(book)
    .select("*")

  if (creation.error) throw new Error(creation.error.message)
  if (creation.data.length === 0) throw new Error("No book was returned from the creation")

  const relation = await supabase
    .from('user_reading_list')
    .insert({
      book_id: creation.data[0].id,
      user_id: userId,
    })

  if (relation.error) throw new Error(relation.error.message)
  return creation.data[0]
}

export async function addVideoToRewalist(
  userId: string,
  video: VideoWithoutAutogeneratedType,
  supabase: SupabaseClient<Database>
): Promise<DatabaseVideoType> {
  const creation = await supabase
    .from('videos')
    .insert(video)
    .select("*")

  if (creation.error) throw new Error(creation.error.message)
  if (creation.data.length === 0) throw new Error("No book was returned from the creation")

  const relation = await supabase
    .from('user_watching_list')
    .insert({
      video_id: creation.data[0].id,
      user_id: userId,
    })

  if (relation.error) throw new Error(relation.error.message)
  return creation.data[0]
}

