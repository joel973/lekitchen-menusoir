import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArticleFormValues } from "./types";
import { handleImageUpload } from "./handlers/imageHandler";
import { updateArticleRelations } from "./handlers/relationsHandler";
import { createOrUpdateArticle } from "./handlers/articleHandler";

export const useArticleFormSubmit = (article: any | undefined, onCancel: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const onSubmit = async (values: ArticleFormValues) => {
    try {
      console.log("=== Starting form submission ===");
      console.log("Form values:", values);
      console.log("Article being edited:", article);
      
      setIsSubmitting(true);

      let imageUrl = values.url_image;

      if (values.image_file && values.image_file.length > 0) {
        console.log("New image detected, starting upload...");
        const uploadedUrl = await handleImageUpload(values.image_file[0], toast);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const articleData = {
        nom: values.nom,
        description: values.description,
        prix: parseFloat(values.prix),
        categorie_id: values.categorie_id,
        statut: values.statut,
        url_image: imageUrl,
      };

      console.log("Prepared article data:", articleData);
      
      const articleId = await createOrUpdateArticle(article?.id, articleData, toast);
      
      if (articleId) {
        await updateArticleRelations(articleId, values, toast);
      }

      await queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      toast({
        title: "Succès",
        description: article?.id
          ? "Article modifié avec succès"
          : "Article créé avec succès",
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