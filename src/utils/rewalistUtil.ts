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
