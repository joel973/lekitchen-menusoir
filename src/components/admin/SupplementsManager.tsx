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
import { SupplementForm } from "./SupplementForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export function SupplementsManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<any>(null);

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
        .order("created_at", { ascending: false });

      if (error) throw error;
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Articles liés</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplements?.map((supplement) => (
              <TableRow key={supplement.id}>
                <TableCell>{supplement.nom}</TableCell>
                <TableCell>{supplement.description}</TableCell>
                <TableCell>{supplement.prix.toFixed(2)} €</TableCell>
                <TableCell>
                  {supplement.articles_supplements?.map((as: any) => (
                    <span key={as.articles.id} className="mr-2">
                      {as.articles.nom}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingSupplement(supplement)}
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
  );
}