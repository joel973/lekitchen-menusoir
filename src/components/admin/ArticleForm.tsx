import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArticleFormFields } from "./forms/ArticleFormFields";
import { articleSchema, type ArticleFormValues } from "./forms/types";

interface ArticleFormProps {
  article?: any;
  onCancel: () => void;
}

export function ArticleForm({ article, onCancel }: ArticleFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("ordre");
      
      if (error) throw error;
      return data;
    },
  });

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: article || {
      nom: "",
      description: "",
      prix: "",
      categorie_id: "",
      statut: "actif",
      url_image: "",
    },
  });

  const onSubmit = async (values: ArticleFormValues) => {
    try {
      const submitData = {
        nom: values.nom,
        description: values.description,
        prix: parseFloat(values.prix),
        categorie_id: values.categorie_id,
        statut: values.statut,
        url_image: values.url_image,
      };

      console.log('Submitting data:', submitData);

      const { error } = article
        ? await supabase
            .from("articles")
            .update(submitData)
            .eq("id", article.id)
        : await supabase.from("articles").insert(submitData);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: article ? "Article modifié" : "Article créé",
        description: "Les modifications ont été enregistrées",
      });

      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      onCancel();
    } catch (error) {
      console.error("Error saving article:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ArticleFormFields form={form} categories={categories || []} />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {article ? "Modifier" : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}