import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LabelForm } from "./LabelForm";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { AdminPageLayout } from "./shared/AdminPageLayout";

export function LabelsManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingLabel, setEditingLabel] = useState<any>(null);

  const { data: labels, isLoading } = useQuery({
    queryKey: ["labels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("labels")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isCreating || editingLabel) {
    return (
      <AdminPageLayout
        title={editingLabel ? "Modifier un label" : "Nouveau label"}
      >
        <LabelForm
          label={editingLabel}
          onCancel={() => {
            setIsCreating(false);
            setEditingLabel(null);
          }}
        />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Labels"
      description="Gérez les labels disponibles pour vos articles"
      actions={
        <Button onClick={() => setIsCreating(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau label
        </Button>
      }
    >
      <Card>
        <CardContent className="p-0">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Couleur</th>
                <th className="w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {labels?.map((label) => (
                <tr key={label.id}>
                  <td>{label.nom}</td>
                  <td style={{ backgroundColor: label.couleur }}>{label.couleur}</td>
                  <td>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingLabel(label)}
                    >
                      Modifier
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
}
