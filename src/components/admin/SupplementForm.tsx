import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplementSchema } from "./forms/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BasicSupplementFields } from "./forms/fields/BasicSupplementFields";
import { useSupplementFormSubmit } from "./forms/useSupplementFormSubmit";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

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
      // First, check if the supplement is attached to any articles
      const { data: attachedArticles, error: checkError } = await supabase
        .from("articles_supplements")
        .select("article_id")
        .eq("supplement_id", supplement.id);

      if (checkError) throw checkError;

      if (attachedArticles && attachedArticles.length > 0) {
        toast({
          variant: "destructive",
          title: "Impossible de supprimer",
          description: "Ce supplément est attaché à un ou plusieurs articles",
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

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <BasicSupplementFields />
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