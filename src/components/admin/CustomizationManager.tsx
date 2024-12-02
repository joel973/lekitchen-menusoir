import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { HeaderSection } from "./customization/HeaderSection";
import { HomeSection } from "./customization/HomeSection";
import { AdminSection } from "./customization/AdminSection";
import { FooterSection } from "./customization/FooterSection";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">En-tête</h2>
          <HeaderSection parametres={parametres} />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Page d'accueil</h2>
          <HomeSection parametres={parametres} />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Administration</h2>
          <AdminSection parametres={parametres} />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Pied de page</h2>
          <FooterSection parametres={parametres} />
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>
    </form>
  );
}