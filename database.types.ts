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
      authority: {
        Row: {
          auth_cd: string | null
          auth_nm: string | null
          created_at: string
          id: number
        }
        Insert: {
          auth_cd?: string | null
          auth_nm?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          auth_cd?: string | null
          auth_nm?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      blog: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          title: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          title?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          title?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_userId_fkey"
            columns: ["userId"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["userId"]
          },
        ]
      }
      comments: {
        Row: {
          comments: string
          created_at: string
          deleted_at: string | null
          id: number
          level: number | null
          path: string
          pid: number | null
          updated_at: string | null
          userId: string
        }
        Insert: {
          comments: string
          created_at?: string
          deleted_at?: string | null
          id?: number
          level?: number | null
          path: string
          pid?: number | null
          updated_at?: string | null
          userId: string
        }
        Update: {
          comments?: string
          created_at?: string
          deleted_at?: string | null
          id?: number
          level?: number | null
          path?: string
          pid?: number | null
          updated_at?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_path_fkey"
            columns: ["path"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["path"]
          },
          {
            foreignKeyName: "comments_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["userId"]
          },
        ]
      }
      posts: {
        Row: {
          auth_cd: string
          content: string
          created_at: string
          deleted_at: string | null
          path: string
          summary: string | null
          thumbnail: string | null
          title: string
          userId: string
        }
        Insert: {
          auth_cd: string
          content: string
          created_at?: string
          deleted_at?: string | null
          path: string
          summary?: string | null
          thumbnail?: string | null
          title: string
          userId: string
        }
        Update: {
          auth_cd?: string
          content?: string
          created_at?: string
          deleted_at?: string | null
          path?: string
          summary?: string | null
          thumbnail?: string | null
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["userId"]
          },
        ]
      }
      posts_tag: {
        Row: {
          path: string
          tag_id: number
        }
        Insert: {
          path: string
          tag_id: number
        }
        Update: {
          path?: string
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_tag_path_fkey"
            columns: ["path"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["path"]
          },
          {
            foreignKeyName: "posts_tag_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tag"
            referencedColumns: ["tag_id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_cd: string | null
          avatar_url: string | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          is_use: boolean
          userId: string
          username: string
        }
        Insert: {
          auth_cd?: string | null
          avatar_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id: string
          is_use?: boolean
          userId: string
          username: string
        }
        Update: {
          auth_cd?: string | null
          avatar_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_use?: boolean
          userId?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_auth_cd_fkey"
            columns: ["auth_cd"]
            isOneToOne: false
            referencedRelation: "authority"
            referencedColumns: ["auth_cd"]
          },
        ]
      }
      tabs: {
        Row: {
          created_at: string
          deleted_at: string | null
          href: string | null
          id: number
          isUse: string | null
          tab: string
          text: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          href?: string | null
          id?: number
          isUse?: string | null
          tab: string
          text?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          href?: string | null
          id?: number
          isUse?: string | null
          tab?: string
          text?: string | null
        }
        Relationships: []
      }
      tag: {
        Row: {
          create_at: string | null
          name: string
          tag_id: number
        }
        Insert: {
          create_at?: string | null
          name: string
          tag_id?: number
        }
        Update: {
          create_at?: string | null
          name?: string
          tag_id?: number
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
