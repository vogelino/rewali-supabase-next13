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
          createdAt: string
          description: string | null
          id: number
          isbn10: string | null
          isbn13: string
          releaseYear: number | null
          subtitle: string | null
          title: string
          updatedAt: string
        }
        Insert: {
          authors?: string[] | null
          cover?: string | null
          createdAt: string
          description?: string | null
          id?: number
          isbn10?: string | null
          isbn13: string
          releaseYear?: number | null
          subtitle?: string | null
          title: string
          updatedAt: string
        }
        Update: {
          authors?: string[] | null
          cover?: string | null
          createdAt?: string
          description?: string | null
          id?: number
          isbn10?: string | null
          isbn13?: string
          releaseYear?: number | null
          subtitle?: string | null
          title?: string
          updatedAt?: string
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
          bookId: number
          id: number
          userId: string
        }
        Insert: {
          bookId: number
          id?: number
          userId: string
        }
        Update: {
          bookId?: number
          id?: number
          userId?: string
        }
      }
      user_reading_list: {
        Row: {
          bookId: number
          id: number
          userId: string
        }
        Insert: {
          bookId: number
          id?: number
          userId: string
        }
        Update: {
          bookId?: number
          id?: number
          userId?: string
        }
      }
      user_watched_videos: {
        Row: {
          id: number
          userId: string
          videoId: number
        }
        Insert: {
          id?: number
          userId: string
          videoId: number
        }
        Update: {
          id?: number
          userId?: string
          videoId?: number
        }
      }
      user_watching_list: {
        Row: {
          id: number
          userId: string
          videoId: number
        }
        Insert: {
          id?: number
          userId: string
          videoId: number
        }
        Update: {
          id?: number
          userId?: string
          videoId?: number
        }
      }
      videos: {
        Row: {
          authors: string[] | null
          castMembers: string[] | null
          createdAt: string
          description: string | null
          genres: string[] | null
          id: number
          image: string | null
          releaseYear: number | null
          title: string
          updatedAt: string
        }
        Insert: {
          authors?: string[] | null
          castMembers?: string[] | null
          createdAt: string
          description?: string | null
          genres?: string[] | null
          id?: number
          image?: string | null
          releaseYear?: number | null
          title: string
          updatedAt: string
        }
        Update: {
          authors?: string[] | null
          castMembers?: string[] | null
          createdAt?: string
          description?: string | null
          genres?: string[] | null
          id?: number
          image?: string | null
          releaseYear?: number | null
          title?: string
          updatedAt?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
