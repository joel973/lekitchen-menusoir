import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, type ArticleFormValues } from "./forms/types";
import { ArticleFormFields } from "./forms/ArticleFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useArticleFormSubmit } from "./forms/useArticleFormSubmit";
import { useLoadExistingRelations } from "./forms/useLoadExistingRelations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ArticleFormProps {
  article?: any;
  onCancel: () => void;
}

export function ArticleForm({ article, onCancel }: ArticleFormProps) {
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

  useLoadExistingRelations(article?.id, form.setValue);
  const { onSubmit, isSubmitting } = useArticleFormSubmit(article, onCancel);

  return (
    <div className="container max-w-2xl mx-auto px-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {article?.id ? "Modifier un article" : "Nouvel article"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ArticleFormFields />
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {article?.id ? "Modifier" : "Créer"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}