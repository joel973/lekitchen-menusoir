import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SupplementForm } from "./SupplementForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { SupplementsList } from "./SupplementsList";

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
      <SupplementForm
        supplement={editingSupplement}
        onCancel={() => {
          setIsCreating(false);
          setEditingSupplement(null);
        }}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-display">Suppléments</CardTitle>
        <Button onClick={() => setIsCreating(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau supplément
        </Button>
      </CardHeader>
      <CardContent>
        <SupplementsList
          supplements={supplements || []}
          onEdit={setEditingSupplement}
        />
      </CardContent>
    </Card>
  );
}