import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LogoUpload } from "./forms/fields/LogoUpload";

interface CustomizationFormData {
  logo_url?: string;
  couleur_primaire: string;
  couleur_secondaire: string;
  pied_page_texte?: string;
}

export function CustomizationManager() {
  const { toast } = useToast();
  const form = useForm<CustomizationFormData>();

  const { data: parametres, isLoading } = useQuery({
    queryKey: ["parametres"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parametres")
        .select("*")
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      form.reset(data);
    },
  });

  const onSubmit = async (data: CustomizationFormData) => {
    try {
      const { error } = await supabase
        .from("parametres")
        .update(data)
        .eq("id", parametres?.id);

      if (error) throw error;

      toast({
        title: "Paramètres mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error("Error updating parameters:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des paramètres.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <LogoUpload />
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="couleur_primaire" className="text-sm font-medium">
                Couleur primaire
              </label>
              <Input
                type="color"
                {...form.register("couleur_primaire")}
                className="h-10"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="couleur_secondaire" className="text-sm font-medium">
                Couleur secondaire
              </label>
              <Input
                type="color"
                {...form.register("couleur_secondaire")}
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="pied_page_texte" className="text-sm font-medium">
              Texte du pied de page
            </label>
            <Input
              type="text"
              {...form.register("pied_page_texte")}
              placeholder="Ex: © 2024 Le Kitchen. Tous droits réservés."
            />
          </div>
        </div>

        <Button type="submit">
          Enregistrer les modifications
        </Button>
      </form>
    </Form>
  );
}