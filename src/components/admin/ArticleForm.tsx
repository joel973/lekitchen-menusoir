import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const articleSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  prix: z.string().min(1, "Le prix est requis"),
  categorie_id: z.string().min(1, "La catégorie est requise"),
  statut: z.enum(["actif", "inactif", "rupture"]),
  url_image: z.string().optional(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

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
      const { error } = article
        ? await supabase
            .from("articles")
            .update({
              ...values,
              prix: parseFloat(values.prix),
            })
            .eq("id", article.id)
        : await supabase.from("articles").insert({
            ...values,
            prix: parseFloat(values.prix),
          });

      if (error) throw error;

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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categorie_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nom}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="statut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                  <option value="rupture">Rupture</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de l'image</FormLabel>
              <FormControl>
                <Input {...field} />
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
            {article ? "Modifier" : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}