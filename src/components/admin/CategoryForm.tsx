import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { categorySchema, type CategoryFormValues } from "./forms/types";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryFormProps {
  category?: any;
  onCancel: () => void;
}

export function CategoryForm({ category, onCancel }: CategoryFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
      ? { ...category, ordre: category.ordre.toString() }
      : {
          nom: "",
          mode_affichage: "photos",
          ordre: "0",
        },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      const submitData = {
        nom: values.nom,
        mode_affichage: values.mode_affichage,
        ordre: values.ordre,
      };

      const { error } = category
        ? await supabase
            .from("categories")
            .update(submitData)
            .eq("id", category.id)
        : await supabase.from("categories").insert(submitData);

      if (error) throw error;

      toast({
        title: category ? "Catégorie modifiée" : "Catégorie créée",
        description: "Les modifications ont été enregistrées",
      });

      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      onCancel();
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Nom</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mode_affichage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Mode d'affichage</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="photos">Photos</option>
                      <option value="liste">Liste</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ordre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Ordre</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full sm:w-auto"
              >
                Annuler
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                {category ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}