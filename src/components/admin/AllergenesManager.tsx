import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AllergeneForm } from "./AllergeneForm";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { AdminPageLayout } from "./shared/AdminPageLayout";

export function AllergenesManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingAllergene, setEditingAllergene] = useState<any>(null);

  const { data: allergenes, isLoading } = useQuery({
    queryKey: ["allergenes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("allergenes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isCreating || editingAllergene) {
    return (
      <AdminPageLayout
        title={editingAllergene ? "Modifier un allergène" : "Nouvel allergène"}
      >
        <AllergeneForm
          allergene={editingAllergene}
          onCancel={() => {
            setIsCreating(false);
            setEditingAllergene(null);
          }}
        />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Allergènes"
      description="Gérez les allergènes de vos articles"
      actions={
        <Button onClick={() => setIsCreating(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nouvel allergène
        </Button>
      }
    >
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allergenes?.map((allergene) => (
                <TableRow key={allergene.id}>
                  <TableCell>{allergene.nom}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingAllergene(allergene)}
                    >
                      Modifier
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
}