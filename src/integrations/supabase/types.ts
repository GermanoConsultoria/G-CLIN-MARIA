export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      anexo_financeiro: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          lancamento_id: string
          nome: string
          url: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          lancamento_id: string
          nome: string
          url: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          lancamento_id?: string
          nome?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "anexo_financeiro_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamento_financeiro"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          category: string | null
          client_name: string
          created_at: string
          extra_charge: boolean
          id: string
          notes: string | null
          phone: string
          scheduled_at: string
          service_id: string | null
          service_name: string | null
          status: Database["public"]["Enums"]["appointment_status"]
          type: Database["public"]["Enums"]["appointment_type"]
          updated_at: string
          user_id: string
          wants_to_anticipate: boolean
        }
        Insert: {
          category?: string | null
          client_name: string
          created_at?: string
          extra_charge?: boolean
          id?: string
          notes?: string | null
          phone: string
          scheduled_at: string
          service_id?: string | null
          service_name?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          type?: Database["public"]["Enums"]["appointment_type"]
          updated_at?: string
          user_id: string
          wants_to_anticipate?: boolean
        }
        Update: {
          category?: string | null
          client_name?: string
          created_at?: string
          extra_charge?: boolean
          id?: string
          notes?: string | null
          phone?: string
          scheduled_at?: string
          service_id?: string | null
          service_name?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          type?: Database["public"]["Enums"]["appointment_type"]
          updated_at?: string
          user_id?: string
          wants_to_anticipate?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      business_hours: {
        Row: {
          break_end: string | null
          break_start: string | null
          close_time: string
          created_at: string
          id: string
          is_open: boolean
          open_time: string
          updated_at: string
          user_id: string
          weekday: number
        }
        Insert: {
          break_end?: string | null
          break_start?: string | null
          close_time?: string
          created_at?: string
          id?: string
          is_open?: boolean
          open_time?: string
          updated_at?: string
          user_id: string
          weekday: number
        }
        Update: {
          break_end?: string | null
          break_start?: string | null
          close_time?: string
          created_at?: string
          id?: string
          is_open?: boolean
          open_time?: string
          updated_at?: string
          user_id?: string
          weekday?: number
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      chart_accounts: {
        Row: {
          code: string
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["account_kind"]
          name: string
          parent_id: string | null
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          kind: Database["public"]["Enums"]["account_kind"]
          name: string
          parent_id?: string | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["account_kind"]
          name?: string
          parent_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chart_accounts_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "chart_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      clinic_settings: {
        Row: {
          clinic_name: string
          closing_hour: string
          created_at: string
          evaluation_fee: number
          evaluation_free_campaign: boolean
          id: string
          late_cancellation_fee: boolean
          no_children_message: boolean
          no_pets_message: boolean
          opening_hour: string
          reminder_10min_enabled: boolean
          reminder_24h_enabled: boolean
          updated_at: string
          user_id: string
          whatsapp_number: string | null
        }
        Insert: {
          clinic_name?: string
          closing_hour?: string
          created_at?: string
          evaluation_fee?: number
          evaluation_free_campaign?: boolean
          id?: string
          late_cancellation_fee?: boolean
          no_children_message?: boolean
          no_pets_message?: boolean
          opening_hour?: string
          reminder_10min_enabled?: boolean
          reminder_24h_enabled?: boolean
          updated_at?: string
          user_id: string
          whatsapp_number?: string | null
        }
        Update: {
          clinic_name?: string
          closing_hour?: string
          created_at?: string
          evaluation_fee?: number
          evaluation_free_campaign?: boolean
          id?: string
          late_cancellation_fee?: boolean
          no_children_message?: boolean
          no_pets_message?: boolean
          opening_hour?: string
          reminder_10min_enabled?: boolean
          reminder_24h_enabled?: boolean
          updated_at?: string
          user_id?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      lancamento_financeiro: {
        Row: {
          appointment_id: string | null
          beneficiario: string | null
          created_at: string
          created_by: string | null
          descricao: string
          dt_pagamento: string | null
          dt_vencimento: string
          forma_pagamento: string | null
          grupo_parcela_id: string | null
          id: string
          lancamento_pai_id: string | null
          numero_documento: string | null
          numero_parcelas: number | null
          parcela_atual: number | null
          plano_contas_id: string
          recorrencia: string
          status: string
          tipo: string
          updated_at: string
          valor: number
        }
        Insert: {
          appointment_id?: string | null
          beneficiario?: string | null
          created_at?: string
          created_by?: string | null
          descricao: string
          dt_pagamento?: string | null
          dt_vencimento: string
          forma_pagamento?: string | null
          grupo_parcela_id?: string | null
          id?: string
          lancamento_pai_id?: string | null
          numero_documento?: string | null
          numero_parcelas?: number | null
          parcela_atual?: number | null
          plano_contas_id: string
          recorrencia?: string
          status?: string
          tipo: string
          updated_at?: string
          valor: number
        }
        Update: {
          appointment_id?: string | null
          beneficiario?: string | null
          created_at?: string
          created_by?: string | null
          descricao?: string
          dt_pagamento?: string | null
          dt_vencimento?: string
          forma_pagamento?: string | null
          grupo_parcela_id?: string | null
          id?: string
          lancamento_pai_id?: string | null
          numero_documento?: string | null
          numero_parcelas?: number | null
          parcela_atual?: number | null
          plano_contas_id?: string
          recorrencia?: string
          status?: string
          tipo?: string
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "lancamento_financeiro_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamento_financeiro_lancamento_pai_id_fkey"
            columns: ["lancamento_pai_id"]
            isOneToOne: false
            referencedRelation: "lancamento_financeiro"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamento_financeiro_plano_contas_id_fkey"
            columns: ["plano_contas_id"]
            isOneToOne: false
            referencedRelation: "plano_contas"
            referencedColumns: ["id"]
          },
        ]
      }
      payables: {
        Row: {
          account_id: string | null
          amount: number
          created_at: string
          description: string
          due_date: string
          id: string
          notes: string | null
          paid_at: string | null
          status: Database["public"]["Enums"]["finance_status"]
          supplier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id?: string | null
          amount: number
          created_at?: string
          description: string
          due_date: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          status?: Database["public"]["Enums"]["finance_status"]
          supplier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string | null
          amount?: number
          created_at?: string
          description?: string
          due_date?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          status?: Database["public"]["Enums"]["finance_status"]
          supplier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payables_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "chart_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      plano_contas: {
        Row: {
          ativo: boolean
          created_at: string
          created_by: string | null
          id: string
          nome: string
          tipo: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          created_by?: string | null
          id?: string
          nome: string
          tipo: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          created_by?: string | null
          id?: string
          nome?: string
          tipo?: string
          updated_at?: string
        }
        Relationships: []
      }
      parametros: {
        Row: {
          created_at: string
          id: string
          plano_contas_padrao_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          plano_contas_padrao_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          plano_contas_padrao_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parametros_plano_contas_padrao_id_fkey"
            columns: ["plano_contas_padrao_id"]
            isOneToOne: false
            referencedRelation: "plano_contas"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ativo: boolean
          cargo: string | null
          created_at: string
          full_name: string | null
          id: string
          modulos: string[]
          role: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          cargo?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          modulos?: string[]
          role?: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          cargo?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          modulos?: string[]
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      receivables: {
        Row: {
          account_id: string | null
          amount: number
          appointment_id: string | null
          client_name: string | null
          created_at: string
          description: string
          due_date: string
          id: string
          notes: string | null
          received_at: string | null
          service_id: string | null
          status: Database["public"]["Enums"]["finance_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id?: string | null
          amount: number
          appointment_id?: string | null
          client_name?: string | null
          created_at?: string
          description: string
          due_date: string
          id?: string
          notes?: string | null
          received_at?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["finance_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string | null
          amount?: number
          appointment_id?: string | null
          client_name?: string | null
          created_at?: string
          description?: string
          due_date?: string
          id?: string
          notes?: string | null
          received_at?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["finance_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "receivables_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "chart_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receivables_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receivables_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          active: boolean
          category_group: string | null
          cost: number
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_hof: boolean
          name: string
          plano_contas_id: string | null
          price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean
          category_group?: string | null
          cost?: number
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_hof?: boolean
          name: string
          plano_contas_id?: string | null
          price?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean
          category_group?: string | null
          cost?: number
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_hof?: boolean
          name?: string
          plano_contas_id?: string | null
          price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_plano_contas_id_fkey"
            columns: ["plano_contas_id"]
            isOneToOne: false
            referencedRelation: "plano_contas"
            referencedColumns: ["id"]
          },
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
      account_kind: "receita" | "despesa"
      appointment_status:
        | "agendado"
        | "confirmado"
        | "concluido"
        | "cancelado"
        | "falta"
        | "pendente_pagamento"
      appointment_type: "procedimento" | "avaliacao" | "retorno" | "encaixe"
      finance_status: "pendente" | "pago" | "atrasado" | "cancelado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_kind: ["receita", "despesa"],
      appointment_status: [
        "agendado",
        "confirmado",
        "concluido",
        "cancelado",
        "falta",
      ],
      appointment_type: ["procedimento", "avaliacao", "retorno", "encaixe"],
      finance_status: ["pendente", "pago", "atrasado", "cancelado"],
    },
  },
} as const
