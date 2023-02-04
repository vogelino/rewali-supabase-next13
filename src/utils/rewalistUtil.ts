import { Database } from "@/lib/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getRewalist(userId: string, supabase: SupabaseClient<Database>) {
  const [booksRes, videoRes] = await Promise.all([
    supabase.from('user_reading_list').select(`
      bookId (
        id,
        createdAt,
        title,
        subtitle,
        description,
        isbn10,
        isbn13,
        cover,
        releaseYear,
        authors
      )
    `, { count: "exact" }).eq('userId', userId),
    supabase.from('user_watching_list').select(`
      videoId (
        id,
        createdAt,
        title,
        description,
        image,
        castMembers,
        genres,
        releaseYear,
        authors
      )
    `, { count: "exact" }).eq('userId', userId),
  ])

  if (booksRes.error) throw new Error(booksRes.error.message)
  if (videoRes.error) throw new Error(videoRes.error.message)

  return {
    books: booksRes.data,
    booksCount: booksRes.count || 0,
    videos: videoRes.data,
    videosCount: videoRes.count || 0,
  }
}

type BookType = Database['public']['Tables']['books']['Row']
type BookWithoutIdType = Omit<BookType, 'id'>

export async function addBookToRewalist(
  userId: string,
  book: BookWithoutIdType,
  supabase: SupabaseClient<Database>
): Promise<void> {
  const creation = await supabase
    .from('books')
    .insert(book)
    .select("id")

  if (creation.error) throw new Error(creation.error.message)
  if (creation.data.length === 0) throw new Error("No book was returned from the creation")

  const relation = await supabase
    .from('user_read_books')
    .insert({
      bookId: creation.data[0].id,
      userId,
    })

  if (relation.error) throw new Error(relation.error.message)
}

