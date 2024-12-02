import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useLabelsManagement = (articleId: string, onUpdate: () => void) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleLabel = async (labelId: string, currentlySelected: boolean) => {
    console.log("Toggling label:", { labelId, currentlySelected });
    setIsUpdating(true);
    try {
      if (currentlySelected) {
        console.log("Removing label");
        const { error } = await supabase
          .from("articles_labels")
          .delete()
          .eq("article_id", articleId)
          .eq("label_id", labelId);
        if (error) throw error;
      } else {
        console.log("Adding label");
        const { data, error } = await supabase
          .from("articles_labels")
          .select("*")
          .eq("article_id", articleId)
          .eq("label_id", labelId);

        if (error) throw error;

        // Only insert if no existing relation is found
        if (data.length === 0) {
          const { error: insertError } = await supabase
            .from("articles_labels")
            .insert({ article_id: articleId, label_id: labelId });
          if (insertError) throw insertError;
        }
      }
      onUpdate();
    } catch (error: any) {
      console.error("Error toggling label:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour les labels",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return { toggleLabel, isUpdating };
};