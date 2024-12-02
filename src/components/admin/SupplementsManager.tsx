import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SupplementForm } from "./SupplementForm";
import { SupplementsList } from "./SupplementsList";

export function SupplementsManager() {
  const [selectedSupplement, setSelectedSupplement] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: supplements, isLoading } = useQuery({
    queryKey: ["supplements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("supplements")
        .select(`
          *,
          articles_supplements (
            articles (
              id,
              nom
            )
          )
        `)
        .order("nom");
      
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = (supplement: any) => {
    setSelectedSupplement(supplement);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setSelectedSupplement(null);
    setIsFormOpen(false);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isFormOpen) {
    return (
      <SupplementForm
        supplement={selectedSupplement}
        onCancel={handleClose}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau supplément
        </Button>
      </div>

      <SupplementsList
        supplements={supplements || []}
        onEdit={handleEdit}
      />
    </div>
  );
}