import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplementSchema } from "./forms/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BasicSupplementFields } from "./forms/fields/BasicSupplementFields";
import { useSupplementFormSubmit } from "./forms/useSupplementFormSubmit";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SupplementFormProps {
  supplement?: any;
  onCancel: () => void;
}

export function SupplementForm({ supplement, onCancel }: SupplementFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm({
    resolver: zodResolver(supplementSchema),
    defaultValues: supplement
      ? {
          ...supplement,
          prix: supplement.prix?.toString() || "0",
        }
      : {
          prix: "0",
        },
  });

  const { onSubmit, isSubmitting } = useSupplementFormSubmit(supplement, onCancel);

  const handleDelete = async () => {
    try {
      const { data: attachedArticles, error: checkError } = await supabase
        .from("articles_supplements")
        .select("articles (*)")
        .eq("supplement_id", supplement.id);

      if (checkError) throw checkError;

      if (attachedArticles && attachedArticles.length > 0) {
        toast({
          variant: "destructive",
          title: "Impossible de supprimer",
          description: "Ce supplément est attaché à un ou plusieurs articles. Veuillez d'abord le détacher des articles.",
        });
        return;
      }

      const { error: deleteError } = await supabase
        .from("supplements")
        .delete()
        .eq("id", supplement.id);

      if (deleteError) throw deleteError;

      toast({
        title: "Supplément supprimé",
        description: "Le supplément a été supprimé avec succès",
      });

      await queryClient.invalidateQueries({ queryKey: ["supplements"] });
      onCancel();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le supplément",
      });
    }
  };

  const { data: attachedArticles } = useQuery({
    queryKey: ["supplement-articles", supplement?.id],
    queryFn: async () => {
      if (!supplement?.id) return [];
      
      const { data, error } = await supabase
        .from("articles_supplements")
        .select(`
          articles (
            id,
            nom
          )
        `)
        .eq("supplement_id", supplement.id);
      
      if (error) throw error;
      return data?.map(item => item.articles) || [];
    },
    enabled: !!supplement?.id,
  });

  return (
    <Card className="max-w-3xl mx-auto glass-card animate-scale-in">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <BasicSupplementFields />

            {supplement && attachedArticles && attachedArticles.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Ce supplément est utilisé dans les articles suivants :
                  <div className="mt-2 flex flex-wrap gap-1">
                    {attachedArticles.map((article: any) => (
                      <span 
                        key={article.id}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {article.nom}
                      </span>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto hover:bg-secondary/80"
                >
                  Annuler
                </Button>
                {supplement && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    className="w-full sm:w-auto"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {supplement ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}