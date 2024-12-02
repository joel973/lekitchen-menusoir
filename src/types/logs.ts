import { Json } from "@/integrations/supabase/types";

export interface LogUser {
  first_name: string | null;
  last_name: string | null;
}

export interface Log {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Json | null;
  created_at: string;
  user: LogUser | null;
}