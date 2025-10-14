export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: number | null
          created_at: string
          description: string | null
          id: number
          image_url: string | null
          name: string
          price: number
          stock: number
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          price: number
          stock?: number
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          price?: number
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
