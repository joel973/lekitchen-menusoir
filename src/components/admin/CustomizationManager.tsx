import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LogoUpload } from "./forms/fields/LogoUpload";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
        couleur_primaire: formData.get("couleur_primaire")?.toString() || "#000000",
        couleur_secondaire: formData.get("couleur_secondaire")?.toString() || "#000000",
        background_color: formData.get("background_color")?.toString() || "#FAFAF8",
        category_button_color: formData.get("category_button_color")?.toString() || "#F0EFEA",
        card_background_color: formData.get("card_background_color")?.toString() || "#FFFFFF",
        card_shadow: formData.get("card_shadow")?.toString() || "shadow-sm",
        use_logo: formData.get("use_logo") === "on",
        header_text: formData.get("header_text")?.toString() || "Le Kitchen",
        header_text_color: formData.get("header_text_color")?.toString() || "#141413",
        pied_page_texte: formData.get("pied_page_texte")?.toString() || "",
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>En-tête</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="use_logo"
                  name="use_logo"
                  defaultChecked={parametres.use_logo}
                />
                <Label htmlFor="use_logo">Utiliser un logo</Label>
              </div>

              {parametres.use_logo ? (
                <LogoUpload logoUrl={parametres.logo_url} />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="header_text">Texte de l'en-tête</Label>
                    <Input
                      id="header_text"
                      name="header_text"
                      defaultValue={parametres.header_text}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="header_text_color">Couleur du texte</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id="header_text_color"
                        name="header_text_color"
                        defaultValue={parametres.header_text_color}
                        className="w-24 h-12 p-1"
                      />
                      <Input
                        type="text"
                        name="header_text_color"
                        defaultValue={parametres.header_text_color}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Page d'accueil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="background_color">Couleur de fond</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="background_color"
                    name="background_color"
                    defaultValue={parametres.background_color}
                    className="w-24 h-12 p-1"
                  />
                  <Input
                    type="text"
                    name="background_color"
                    defaultValue={parametres.background_color}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_button_color">
                  Couleur des boutons de catégorie
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="category_button_color"
                    name="category_button_color"
                    defaultValue={parametres.category_button_color}
                    className="w-24 h-12 p-1"
                  />
                  <Input
                    type="text"
                    name="category_button_color"
                    defaultValue={parametres.category_button_color}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Administration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="couleur_primaire">Couleur principale</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="couleur_primaire"
                    name="couleur_primaire"
                    defaultValue={parametres.couleur_primaire}
                    className="w-24 h-12 p-1"
                  />
                  <Input
                    type="text"
                    name="couleur_primaire"
                    defaultValue={parametres.couleur_primaire}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card_background_color">
                  Couleur de fond des cartes
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="card_background_color"
                    name="card_background_color"
                    defaultValue={parametres.card_background_color}
                    className="w-24 h-12 p-1"
                  />
                  <Input
                    type="text"
                    name="card_background_color"
                    defaultValue={parametres.card_background_color}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card_shadow">Ombrage des cartes</Label>
                <select
                  id="card_shadow"
                  name="card_shadow"
                  defaultValue={parametres.card_shadow}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="shadow-none">Aucun</option>
                  <option value="shadow-sm">Léger</option>
                  <option value="shadow-md">Moyen</option>
                  <option value="shadow-lg">Fort</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pied de page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pied_page_texte">Texte du pied de page</Label>
                <Textarea
                  id="pied_page_texte"
                  name="pied_page_texte"
                  defaultValue={parametres.pied_page_texte || ""}
                  placeholder="Entrez le texte du pied de page"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}