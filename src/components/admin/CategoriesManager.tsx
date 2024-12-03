import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableRow } from "./SortableRow";
import { useToast } from "@/hooks/use-toast";
import { AdminPageLayout } from "./shared/AdminPageLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function CategoriesManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id && categories) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);

      const newOrder = arrayMove(categories, oldIndex, newIndex);

      // Optimistically update the UI
      queryClient.setQueryData(["admin-categories"], newOrder);

      // Update the order in the database
      try {
        const updates = newOrder.map((category, index) => ({
          id: category.id,
          nom: category.nom,
          mode_affichage: category.mode_affichage,
          ordre: index,
        }));

        const { error } = await supabase
          .from("categories")
          .upsert(updates);

        if (error) throw error;

        toast({
          title: "Ordre mis à jour",
          description: "L'ordre des catégories a été mis à jour avec succès",
        });
      } catch (error) {
        console.error("Error updating order:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la mise à jour de l'ordre",
          variant: "destructive",
        });
        // Revert the optimistic update
        queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      }
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isCreating || editingCategory) {
    return (
      <AdminPageLayout
        title={editingCategory ? "Modifier une catégorie" : "Nouvelle catégorie"}
      >
        <CategoryForm
          category={editingCategory}
          onCancel={() => {
            setIsCreating(false);
            setEditingCategory(null);
          }}
        />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Catégories"
      description="Gérez les catégories de votre carte"
      actions={
        <Button onClick={() => setIsCreating(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle catégorie
        </Button>
      }
    >
      <Card className="relative overflow-hidden glass-card animate-scale-in border-0 shadow-none">
        <div className="p-4 md:p-6">
          <div className="space-y-6">
            <div className="overflow-hidden">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className={cn(isMobile && "px-2 py-3 text-xs")}>
                        Nom
                      </TableHead>
                      <TableHead className={cn(isMobile && "px-2 py-3 text-xs")}>
                        Mode d'affichage
                      </TableHead>
                      <TableHead className={cn("w-[100px]", isMobile && "px-2 py-3 text-xs")}>
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <SortableContext
                      items={categories?.map((cat) => cat.id) || []}
                      strategy={verticalListSortingStrategy}
                    >
                      {categories?.map((category) => (
                        <SortableRow
                          key={category.id}
                          item={category}
                          onEdit={() => setEditingCategory(category)}
                        />
                      ))}
                    </SortableContext>
                  </TableBody>
                </Table>
              </DndContext>
            </div>
          </div>
        </div>
      </Card>
    </AdminPageLayout>
  );
}
