import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, type ArticleFormValues } from "./forms/types";
import { ArticleFormFields } from "./forms/ArticleFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useArticleFormSubmit } from "./forms/useArticleFormSubmit";
import { useLoadExistingRelations } from "./forms/useLoadExistingRelations";
import { Card, CardContent } from "@/components/ui/card";

interface ArticleFormProps {
  article?: any;
  onCancel: () => void;
}

export function ArticleForm({ article, onCancel }: ArticleFormProps) {
  console.log("ArticleForm rendering with article:", article);
  
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

  console.log("Form state:", form.formState);
  console.log("Form values:", form.getValues());
  console.log("Form errors:", form.formState.errors);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Form {...form}>
          <form 
            onSubmit={(e) => {
              console.log("Form submit event triggered");
              const isValid = form.formState.isValid;
              console.log("Form is valid:", isValid);
              form.handleSubmit(handleSubmit)(e);
            }} 
            className="space-y-8"
          >
            <ArticleFormFields />
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6 border-t">
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
                {article ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}