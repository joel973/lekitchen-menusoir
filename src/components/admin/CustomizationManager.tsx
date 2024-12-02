import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LogoUpload } from "./forms/fields/LogoUpload";
import { toast } from "sonner";

export function CustomizationManager() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: parametres, refetch } = useQuery({
    queryKey: ["parametres"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parametres")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const updates = {
        couleur_primaire: formData.get("couleur_primaire"),
        couleur_secondaire: formData.get("couleur_secondaire"),
        pied_page_texte: formData.get("pied_page_texte"),
      };

      const { error } = await supabase
        .from("parametres")
        .update(updates)
        .eq("id", parametres?.id);

      if (error) throw error;

      toast.success("Paramètres mis à jour avec succès");
      refetch();
    } catch (error) {
      console.error("Erreur lors de la mise à jour des paramètres:", error);
      toast.error("Erreur lors de la mise à jour des paramètres");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!parametres) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <LogoUpload currentLogoUrl={parametres.logo_url} />
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Apparence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="couleur_primaire" className="text-sm font-medium">
                Couleur primaire
              </label>
              <Input
                type="color"
                id="couleur_primaire"
                name="couleur_primaire"
                defaultValue={parametres.couleur_primaire}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="couleur_secondaire" className="text-sm font-medium">
                Couleur secondaire
              </label>
              <Input
                type="color"
                id="couleur_secondaire"
                name="couleur_secondaire"
                defaultValue={parametres.couleur_secondaire}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="pied_page_texte" className="text-sm font-medium">
                Texte du pied de page
              </label>
              <Textarea
                id="pied_page_texte"
                name="pied_page_texte"
                defaultValue={parametres.pied_page_texte || ""}
                placeholder="Entrez le texte du pied de page"
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}