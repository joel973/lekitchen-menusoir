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
    console.log("Form values:", values);
    setIsSubmitting(true);
    try {
      let imageUrl = values.url_image;

      if (values.image_file && values.image_file.length > 0) {
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

      let articleId = article?.id;

      if (article?.id) {
        const { error } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", article.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("articles")
          .insert([articleData])
          .select()
          .single();

        if (error) throw error;
        articleId = data.id;
      }

      // Mettre à jour les relations avec les allergènes
      if (articleId) {
        await supabase
          .from("articles_allergenes")
          .delete()
          .eq("article_id", articleId);

        if (values.allergenes.length > 0) {
          const allergeneRelations = values.allergenes.map((allergeneId) => ({
            article_id: articleId,
            allergene_id: allergeneId,
          }));

          const { error: allergenesError } = await supabase
            .from("articles_allergenes")
            .insert(allergeneRelations);

          if (allergenesError) throw allergenesError;
        }

        await supabase
          .from("articles_labels")
          .delete()
          .eq("article_id", articleId);

        if (values.labels.length > 0) {
          const labelRelations = values.labels.map((labelId) => ({
            article_id: articleId,
            label_id: labelId,
          }));

          const { error: labelsError } = await supabase
            .from("articles_labels")
            .insert(labelRelations);

          if (labelsError) throw labelsError;
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