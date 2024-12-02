import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, type ArticleFormValues } from "./forms/types";
import { ArticleFormFields } from "./forms/ArticleFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ArticleFormProps {
  article?: any;
  onCancel: () => void;
}

export function ArticleForm({ article, onCancel }: ArticleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: article
      ? {
          ...article,
          prix: article.prix.toString(),
          allergenes: [],
          labels: [],
        }
      : {
          statut: "actif",
          allergenes: [],
          labels: [],
        },
  });

  // Charger les allergènes et labels existants
  const loadExistingRelations = async () => {
    if (article?.id) {
      const [allergenesResult, labelsResult] = await Promise.all([
        supabase
          .from("articles_allergenes")
          .select("allergene_id")
          .eq("article_id", article.id),
        supabase
          .from("articles_labels")
          .select("label_id")
          .eq("article_id", article.id),
      ]);

      if (!allergenesResult.error && allergenesResult.data) {
        form.setValue(
          "allergenes",
          allergenesResult.data.map((item) => item.allergene_id)
        );
      }

      if (!labelsResult.error && labelsResult.data) {
        form.setValue(
          "labels",
          labelsResult.data.map((item) => item.label_id)
        );
      }
    }
  };

  // Charger les relations existantes au montage du composant
  React.useEffect(() => {
    loadExistingRelations();
  }, [article?.id]);

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
        // Supprimer les anciennes relations
        await supabase
          .from("articles_allergenes")
          .delete()
          .eq("article_id", articleId);

        // Ajouter les nouvelles relations
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

        // Supprimer les anciennes relations avec les labels
        await supabase
          .from("articles_labels")
          .delete()
          .eq("article_id", articleId);

        // Ajouter les nouvelles relations avec les labels
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ArticleFormFields />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {article?.id ? "Modifier" : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}