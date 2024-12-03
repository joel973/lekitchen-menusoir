import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LabelForm } from "./LabelForm";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { AdminPageLayout } from "./shared/AdminPageLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Couleur</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labels?.map((label) => (
              <TableRow key={label.id}>
                <TableCell>{label.nom}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded" 
                      style={{ backgroundColor: label.couleur }}
                    />
                    <span>{label.couleur}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingLabel(label)}
                  >
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </AdminPageLayout>
  );
}