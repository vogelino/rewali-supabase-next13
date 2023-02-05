export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          authors: string[] | null
          cover: string | null
          created_at: string
          description: string | null
          id: number
          isbn10: string | null
          isbn13: string | null
          release_year: number | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          authors?: string[] | null
          cover?: string | null
          created_at?: string
          description?: string | null
          id?: number
          isbn10?: string | null
          isbn13?: string | null
          release_year?: number | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          authors?: string[] | null
          cover?: string | null
          created_at?: string
          description?: string | null
          id?: number
          isbn10?: string | null
          isbn13?: string | null
          release_year?: number | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          email?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          updated_at?: string | null
        }
      }
      user_read_books: {
        Row: {
          book_id: number
          id: number
          user_id: string
        }
        Insert: {
          book_id: number
          id?: number
          user_id: string
        }
        Update: {
          book_id?: number
          id?: number
          user_id?: string
        }
      }
      user_reading_list: {
        Row: {
          book_id: number
          id: number
          user_id: string
        }
        Insert: {
          book_id: number
          id?: number
          user_id: string
        }
        Update: {
          book_id?: number
          id?: number
          user_id?: string
        }
      }
      user_watched_videos: {
        Row: {
          id: number
          user_id: string
          video_id: number
        }
        Insert: {
          id?: number
          user_id: string
          video_id: number
        }
        Update: {
          id?: number
          user_id?: string
          video_id?: number
        }
      }
      user_watching_list: {
        Row: {
          id: number
          user_id: string
          video_id: number
        }
        Insert: {
          id?: number
          user_id: string
          video_id: number
        }
        Update: {
          id?: number
          user_id?: string
          video_id?: number
        }
      }
      videos: {
        Row: {
          cast_members: string[] | null
          created_at: string
          description: string | null
          genres: string[] | null
          id: number
          image: string | null
          release_year: number | null
          title: string
          updated_at: string
        }
        Insert: {
          cast_members?: string[] | null
          created_at?: string
          description?: string | null
          genres?: string[] | null
          id?: number
          image?: string | null
          release_year?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          cast_members?: string[] | null
          created_at?: string
          description?: string | null
          genres?: string[] | null
          id?: number
          image?: string | null
          release_year?: number | null
          title?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_books_to_reading_list: {
        Args: { bookid: number; userid: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
