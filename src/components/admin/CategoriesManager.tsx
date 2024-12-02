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
import { CategoryForm } from "./CategoryForm";

export function CategoriesManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("ordre");

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isCreating || editingCategory) {
    return (
      <CategoryForm
        category={editingCategory}
        onCancel={() => {
          setIsCreating(false);
          setEditingCategory(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Button onClick={() => setIsCreating(true)}>
          Nouvelle catégorie
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Mode d'affichage</TableHead>
            <TableHead>Ordre</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.nom}</TableCell>
              <TableCell>{category.mode_affichage}</TableCell>
              <TableCell>{category.ordre}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingCategory(category)}
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