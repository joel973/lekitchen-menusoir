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
      <AllergeneForm
        allergene={editingAllergene}
        onCancel={() => {
          setIsCreating(false);
          setEditingAllergene(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Button onClick={() => setIsCreating(true)}>Nouvel allergène</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Actions</TableHead>
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
    </div>
  );
}