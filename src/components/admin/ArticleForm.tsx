import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, type ArticleFormValues } from "./forms/types";
import { ArticleFormFields } from "./forms/ArticleFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useArticleFormSubmit } from "./forms/useArticleFormSubmit";
import { useLoadExistingRelations } from "./forms/useLoadExistingRelations";

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