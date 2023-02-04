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
          id: string
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
          id: string
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
          id?: string
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
          emailVerified: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          email?: string | null
          emailVerified?: string | null
          id: string
          image?: string | null
          name?: string | null
        }
        Update: {
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
      }
      user_read_books: {
        Row: {
          bookId: string
          id: number
          userId: string
        }
        Insert: {
          bookId: string
          id?: number
          userId: string
        }
        Update: {
          bookId?: string
          id?: number
          userId?: string
        }
      }
      user_reading_list: {
        Row: {
          bookId: string
          id: number
          userId: string
        }
        Insert: {
          bookId: string
          id?: number
          userId: string
        }
        Update: {
          bookId?: string
          id?: number
          userId?: string
        }
      }
      user_watched_videos: {
        Row: {
          id: number
          userId: string
          videoId: string
        }
        Insert: {
          id?: number
          userId: string
          videoId: string
        }
        Update: {
          id?: number
          userId?: string
          videoId?: string
        }
      }
      user_watching_list: {
        Row: {
          id: number
          userId: string
          videoId: string
        }
        Insert: {
          id?: number
          userId: string
          videoId: string
        }
        Update: {
          id?: number
          userId?: string
          videoId?: string
        }
      }
      videos: {
        Row: {
          authors: string[] | null
          castMembers: string[] | null
          createdAt: string
          description: string | null
          genres: string[] | null
          id: string
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
          id: string
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
          id?: string
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
