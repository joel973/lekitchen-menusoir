import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArticleFormValues } from "./types";

export const useArticleFormSubmit = (article: any | undefined, onCancel: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleImageUpload = async (file: File): Promise<string | null> => {
    console.log("Uploading image:", file.name);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('article-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'upload de l'image",
        description: uploadError.message,
      });
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('article-images')
      .getPublicUrl(filePath);

    console.log("Image uploaded successfully:", publicUrl);
    return publicUrl;
  };

  const onSubmit = async (values: ArticleFormValues) => {
    try {
      console.log("=== Starting form submission ===");
      console.log("Form values:", values);
      console.log("Article being edited:", article);
      
      setIsSubmitting(true);

      let imageUrl = values.url_image;

      if (values.image_file && values.image_file.length > 0) {
        console.log("New image detected, starting upload...");
        const uploadedUrl = await handleImageUpload(values.image_file[0]);
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
      let articleId = article?.id;

      if (article?.id) {
        console.log("Updating existing article with ID:", article.id);
        const { data: updateData, error: updateError } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", article.id)
          .select();

        if (updateError) {
          console.error("Error updating article:", updateError);
          throw updateError;
        }
        console.log("Article updated successfully:", updateData);
      } else {
        console.log("Creating new article");
        const { data: insertData, error: insertError } = await supabase
          .from("articles")
          .insert([articleData])
          .select()
          .single();

        if (insertError) {
          console.error("Error creating article:", insertError);
          throw insertError;
        }
        articleId = insertData.id;
        console.log("New article created with ID:", articleId);
      }

      // Mettre à jour les relations avec les allergènes
      if (articleId) {
        console.log("=== Updating relations ===");
        console.log("Updating allergenes for article:", articleId);
        console.log("Selected allergenes:", values.allergenes);
        
        const { error: deleteAllergensError } = await supabase
          .from("articles_allergenes")
          .delete()
          .eq("article_id", articleId);

        if (deleteAllergensError) {
          console.error("Error deleting existing allergens:", deleteAllergensError);
          throw deleteAllergensError;
        }

        if (values.allergenes.length > 0) {
          const allergeneRelations = values.allergenes.map((allergeneId) => ({
            article_id: articleId,
            allergene_id: allergeneId,
          }));

          console.log("Inserting allergen relations:", allergeneRelations);
          const { error: allergenesError } = await supabase
            .from("articles_allergenes")
            .insert(allergeneRelations);

          if (allergenesError) {
            console.error("Error updating allergenes:", allergenesError);
            throw allergenesError;
          }
          console.log("Allergenes relations updated successfully");
        }

        console.log("Updating labels for article:", articleId);
        console.log("Selected labels:", values.labels);
        
        const { error: deleteLabelsError } = await supabase
          .from("articles_labels")
          .delete()
          .eq("article_id", articleId);

        if (deleteLabelsError) {
          console.error("Error deleting existing labels:", deleteLabelsError);
          throw deleteLabelsError;
        }

        if (values.labels.length > 0) {
          const labelRelations = values.labels.map((labelId) => ({
            article_id: articleId,
            label_id: labelId,
          }));

          console.log("Inserting label relations:", labelRelations);
          const { error: labelsError } = await supabase
            .from("articles_labels")
            .insert(labelRelations);

          if (labelsError) {
            console.error("Error updating labels:", labelsError);
            throw labelsError;
          }
          console.log("Labels relations updated successfully");
        }
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