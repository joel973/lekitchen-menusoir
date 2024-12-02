import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useArticleStatus = (articleId: string, onUpdate: () => void) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("articles")
        .update({ statut: newStatus })
        .eq("id", articleId);

      if (error) throw error;

      toast({
        title: "Statut mis à jour",
        description: `L'article est maintenant ${
          newStatus === "actif"
            ? "affiché"
            : newStatus === "inactif"
            ? "masqué"
            : "en rupture"
        }`,
      });
      onUpdate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateStatus, isUpdating };
};