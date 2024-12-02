import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AdminPageLayout } from "./shared/AdminPageLayout";

export function EstablishmentManager() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: etablissement, refetch } = useQuery({
    queryKey: ["etablissement"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("etablissement")
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
        nom: formData.get("nom")?.toString(),
        description: formData.get("description")?.toString(),
        adresse: formData.get("adresse")?.toString(),
        telephone: formData.get("telephone")?.toString(),
        email: formData.get("email")?.toString(),
      };

      const { error } = await supabase
        .from("etablissement")
        .update(updates)
        .eq("id", etablissement?.id);

      if (error) throw error;

      toast.success("Établissement mis à jour avec succès");
      refetch();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'établissement:", error);
      toast.error("Erreur lors de la mise à jour de l'établissement");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!etablissement) return null;

  return (
    <AdminPageLayout
      title="Établissement"
      description="Gérez les informations de votre établissement"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nom" className="text-sm font-medium">
              Nom de l'établissement
            </label>
            <Input
              type="text"
              id="nom"
              name="nom"
              defaultValue={etablissement.nom || ""}
              placeholder="Le Kitchen"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              defaultValue={etablissement.description || ""}
              placeholder="Description de votre établissement"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="adresse" className="text-sm font-medium">
              Adresse
            </label>
            <Input
              type="text"
              id="adresse"
              name="adresse"
              defaultValue={etablissement.adresse || ""}
              placeholder="123 rue Example"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="telephone" className="text-sm font-medium">
              Téléphone
            </label>
            <Input
              type="tel"
              id="telephone"
              name="telephone"
              defaultValue={etablissement.telephone || ""}
              placeholder="+33 1 23 45 67 89"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={etablissement.email || ""}
              placeholder="contact@example.com"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </AdminPageLayout>
  );
}