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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Mode d'affichage</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              <FormLabel>Ordre</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {category ? "Modifier" : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}