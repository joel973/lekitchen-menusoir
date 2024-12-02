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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

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
      <Card>
        <CardHeader>
          <CardTitle>
            {editingAllergene ? "Modifier un allergène" : "Nouvel allergène"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AllergeneForm
            allergene={editingAllergene}
            onCancel={() => {
              setIsCreating(false);
              setEditingAllergene(null);
            }}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Allergènes</CardTitle>
          <Button onClick={() => setIsCreating(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel allergène
          </Button>
        </CardHeader>
        <CardContent>
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
    </div>
  );
}