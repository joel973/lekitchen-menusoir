import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SupplementForm } from "./SupplementForm";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { SupplementsList } from "./SupplementsList";
import { AdminPageLayout } from "./shared/AdminPageLayout";

export function SupplementsManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<any>(null);

  const { data: supplements, isLoading } = useQuery({
    queryKey: ["supplements"],
    queryFn: async () => {
      console.log("Fetching supplements with linked articles");
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
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching supplements:", error);
        throw error;
      }
      console.log("Fetched supplements:", data);
      return data;
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isCreating || editingSupplement) {
    return (
      <AdminPageLayout
        title={editingSupplement ? "Modifier un supplément" : "Nouveau supplément"}
      >
        <SupplementForm
          supplement={editingSupplement}
          onCancel={() => {
            setIsCreating(false);
            setEditingSupplement(null);
          }}
        />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Suppléments"
      description="Gérez les suppléments disponibles pour vos articles"
      actions={
        <Button onClick={() => setIsCreating(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau supplément
        </Button>
      }
    >
      <Card>
        <CardContent className="p-0">
          <SupplementsList
            supplements={supplements || []}
            onEdit={setEditingSupplement}
          />
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
}