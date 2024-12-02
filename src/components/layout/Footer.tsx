import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: parametres } = useQuery({
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

  const { data: etablissement } = useQuery({
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

  return (
    <footer className="mt-auto border-t">
      <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-content-secondary">
          {parametres?.pied_page_texte}
        </p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="text-sm text-content-secondary hover:text-content transition-colors">
              Infos utiles
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Informations utiles</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {etablissement?.nom && (
                <div>
                  <h3 className="font-medium mb-1">Établissement</h3>
                  <p className="text-content-secondary">{etablissement.nom}</p>
                </div>
              )}
              {etablissement?.description && (
                <div>
                  <h3 className="font-medium mb-1">À propos</h3>
                  <p className="text-content-secondary">{etablissement.description}</p>
                </div>
              )}
              {etablissement?.adresse && (
                <div>
                  <h3 className="font-medium mb-1">Adresse</h3>
                  <p className="text-content-secondary">{etablissement.adresse}</p>
                </div>
              )}
              {etablissement?.telephone && (
                <div>
                  <h3 className="font-medium mb-1">Téléphone</h3>
                  <p className="text-content-secondary">{etablissement.telephone}</p>
                </div>
              )}
              {etablissement?.email && (
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-content-secondary">{etablissement.email}</p>
                </div>
              )}
              {etablissement?.horaires && (
                <div>
                  <h3 className="font-medium mb-1">Horaires</h3>
                  <div className="space-y-1">
                    {Object.entries(etablissement.horaires).map(([jour, horaires]) => (
                      horaires && (
                        <div key={jour} className="flex justify-between text-sm">
                          <span className="capitalize">{jour}</span>
                          <span className="text-content-secondary">
                            {horaires.ouverture} - {horaires.fermeture}
                          </span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
};