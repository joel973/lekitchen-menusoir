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
      allergenes: {
        Row: {
          created_at: string
          id: string
          nom: string
        }
        Insert: {
          created_at?: string
          id?: string
          nom: string
        }
        Update: {
          created_at?: string
          id?: string
          nom?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          categorie_id: string | null
          created_at: string
          description: string | null
          id: string
          nom: string
          prix: number
          statut: string
          url_image: string | null
        }
        Insert: {
          categorie_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          nom: string
          prix: number
          statut?: string
          url_image?: string | null
        }
        Update: {
          categorie_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          nom?: string
          prix?: number
          statut?: string
          url_image?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_categorie_id_fkey"
            columns: ["categorie_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      articles_allergenes: {
        Row: {
          allergene_id: string
          article_id: string
          created_at: string
        }
        Insert: {
          allergene_id: string
          article_id: string
          created_at?: string
        }
        Update: {
          allergene_id?: string
          article_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_allergenes_allergene_id_fkey"
            columns: ["allergene_id"]
            isOneToOne: false
            referencedRelation: "allergenes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_allergenes_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles_labels: {
        Row: {
          article_id: string
          created_at: string
          label_id: string
        }
        Insert: {
          article_id: string
          created_at?: string
          label_id: string
        }
        Update: {
          article_id?: string
          created_at?: string
          label_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_labels_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_labels_label_id_fkey"
            columns: ["label_id"]
            isOneToOne: false
            referencedRelation: "labels"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          mode_affichage: string
          nom: string
          ordre: number
        }
        Insert: {
          created_at?: string
          id?: string
          mode_affichage: string
          nom: string
          ordre?: number
        }
        Update: {
          created_at?: string
          id?: string
          mode_affichage?: string
          nom?: string
          ordre?: number
        }
        Relationships: []
      }
      etablissement: {
        Row: {
          adresse: string | null
          created_at: string
          description: string | null
          email: string | null
          horaires: Json | null
          id: string
          nom: string | null
          telephone: string | null
        }
        Insert: {
          adresse?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          horaires?: Json | null
          id?: string
          nom?: string | null
          telephone?: string | null
        }
        Update: {
          adresse?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          horaires?: Json | null
          id?: string
          nom?: string | null
          telephone?: string | null
        }
        Relationships: []
      }
      labels: {
        Row: {
          couleur: string | null
          created_at: string
          id: string
          nom: string
          ordre: number | null
        }
        Insert: {
          couleur?: string | null
          created_at?: string
          id?: string
          nom: string
          ordre?: number | null
        }
        Update: {
          couleur?: string | null
          created_at?: string
          id?: string
          nom?: string
          ordre?: number | null
        }
        Relationships: []
      }
      logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string
          entity_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id: string
          entity_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string
          entity_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      parametres: {
        Row: {
          background_color: string | null
          card_background_color: string | null
          card_shadow: string | null
          category_button_color: string | null
          couleur_primaire: string | null
          couleur_secondaire: string | null
          created_at: string
          header_text: string | null
          header_text_color: string | null
          id: string
          logo_url: string | null
          pied_page_texte: string | null
          use_logo: boolean | null
        }
        Insert: {
          background_color?: string | null
          card_background_color?: string | null
          card_shadow?: string | null
          category_button_color?: string | null
          couleur_primaire?: string | null
          couleur_secondaire?: string | null
          created_at?: string
          header_text?: string | null
          header_text_color?: string | null
          id?: string
          logo_url?: string | null
          pied_page_texte?: string | null
          use_logo?: boolean | null
        }
        Update: {
          background_color?: string | null
          card_background_color?: string | null
          card_shadow?: string | null
          category_button_color?: string | null
          couleur_primaire?: string | null
          couleur_secondaire?: string | null
          created_at?: string
          header_text?: string | null
          header_text_color?: string | null
          id?: string
          logo_url?: string | null
          pied_page_texte?: string | null
          use_logo?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active: boolean | null
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "member"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
