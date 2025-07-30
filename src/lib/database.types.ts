export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          slug: string
          published: boolean
          created_at: string
          updated_at: string
          author_id: string
          tags: string[]
          featured_image?: string
          read_time?: number
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          slug: string
          published?: boolean
          created_at?: string
          updated_at?: string
          author_id: string
          tags?: string[]
          featured_image?: string
          read_time?: number
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          slug?: string
          published?: boolean
          created_at?: string
          updated_at?: string
          author_id?: string
          tags?: string[]
          featured_image?: string
          read_time?: number
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          author_name: string
          author_email: string
          content: string
          approved: boolean
          created_at: string
          parent_id?: string
        }
        Insert: {
          id?: string
          post_id: string
          author_name: string
          author_email: string
          content: string
          approved?: boolean
          created_at?: string
          parent_id?: string
        }
        Update: {
          id?: string
          post_id?: string
          author_name?: string
          author_email?: string
          content?: string
          approved?: boolean
          created_at?: string
          parent_id?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          read?: boolean
          created_at?: string
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
