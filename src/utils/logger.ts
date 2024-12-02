import { supabase } from "@/integrations/supabase/client";

type LogAction = {
  action: string;
  entityType: string;
  entityId: string;
  details?: any;
};

export async function logAction({ action, entityType, entityId, details }: LogAction) {
  try {
    if (!entityId) {
      console.error("Entity ID is required for logging");
      return;
    }

    const { error } = await supabase.from("logs").insert({
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
    });

    if (error) {
      console.error("Error logging action:", error);
    }
  } catch (error) {
    console.error("Error logging action:", error);
  }
}