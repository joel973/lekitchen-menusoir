import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SupplementFormValues } from "./types";
import { logAction } from "@/utils/logger";

export const useSupplementFormSubmit = (supplement: any | undefined, onCancel: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const onSubmit = async (values: SupplementFormValues) => {
    try {
      setIsSubmitting(true);

      const supplementData = {
        nom: values.nom,
        description: values.description,
        prix: parseFloat(values.prix),
      };

      if (supplement?.id) {
        const { error: updateError } = await supabase
          .from("supplements")
          .update(supplementData)
          .eq("id", supplement.id);

        if (updateError) throw updateError;

        await logAction({
          action: "update",
          entityType: "supplement",
          entityId: supplement.id,
          details: { previous: supplement, updated: supplementData }
        });
      } else {
        const { error: insertError } = await supabase
          .from("supplements")
          .insert([supplementData]);

        if (insertError) throw insertError;

        await logAction({
          action: "create",
          entityType: "supplement",
          entityId: supplement?.id,
          details: supplementData
        });
      }

      await queryClient.invalidateQueries({ queryKey: ["supplements"] });
      
      toast({
        title: "Succès",
        description: supplement?.id
          ? "Supplément modifié avec succès"
          : "Supplément créé avec succès",
      });
      
      onCancel();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
};