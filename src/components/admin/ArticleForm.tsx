import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, type ArticleFormValues } from "./forms/types";
import { ArticleFormFields } from "./forms/ArticleFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useArticleFormSubmit } from "./forms/useArticleFormSubmit";
import { useLoadExistingRelations } from "./forms/useLoadExistingRelations";
import { Card, CardContent } from "@/components/ui/card";
import { Archive } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface ArticleFormProps {
  article?: any;
  onCancel: () => void;
}

export function ArticleForm({ article, onCancel }: ArticleFormProps) {
  console.log("ArticleForm rendering with article:", article);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: article
      ? {
          ...article,
          prix: article.prix?.toString() || "0",
          allergenes: [],
          labels: [],
        }
      : {
          statut: "actif",
          prix: "0",
          allergenes: [],
          labels: [],
        },
  });

  useLoadExistingRelations(article?.id, form.setValue);
  const { onSubmit, isSubmitting } = useArticleFormSubmit(article, onCancel);

  const handleArchive = async () => {
    try {
      const { error } = await supabase
        .from("articles")
        .update({ statut: "archive" })
        .eq("id", article.id);

      if (error) throw error;

      toast({
        title: "Article archivé",
        description: "L'article a été archivé avec succès",
      });

      await queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      onCancel();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'archiver l'article",
      });
    }
  };

  const handleSubmit = async (values: ArticleFormValues) => {
    console.log("Form submitted with values:", values);
    try {
      console.log("Starting form submission...");
      await onSubmit(values);
      console.log("Form submission completed");
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Form {...form}>
          <form 
            onSubmit={(e) => {
              console.log("Form submit event triggered");
              form.handleSubmit(handleSubmit)(e);
            }} 
            className="space-y-8"
          >
            <ArticleFormFields />
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Annuler
                </Button>
                {article && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleArchive}
                    className="w-full sm:w-auto"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archiver
                  </Button>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {article ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}