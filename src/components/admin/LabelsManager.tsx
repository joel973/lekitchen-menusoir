import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { LabelForm } from "./LabelForm";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableRow } from "./SortableRow";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export function LabelsManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingLabel, setEditingLabel] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data: labels, isLoading } = useQuery({
    queryKey: ["labels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("labels")
        .select("*")
        .order("ordre");

      if (error) throw error;
      return data;
    },
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id || !labels) return;

    const oldIndex = labels.findIndex((label) => label.id === active.id);
    const newIndex = labels.findIndex((label) => label.id === over.id);
    
    const newOrder = arrayMove([...labels], oldIndex, newIndex);
    
    try {
      const updates = newOrder.map((label, index) => ({
        id: label.id,
        nom: label.nom,
        ordre: index,
        couleur: label.couleur,
      }));

      const { error } = await supabase
        .from("labels")
        .upsert(updates, { onConflict: "id" });

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["labels"] });
    } catch (error: any) {
      console.error("Error updating order:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour l'ordre des labels",
      });
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isCreating || editingLabel) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {editingLabel ? "Modifier un label" : "Nouveau label"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LabelForm
            label={editingLabel}
            onCancel={() => {
              setIsCreating(false);
              setEditingLabel(null);
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
          <CardTitle>Labels</CardTitle>
          <Button onClick={() => setIsCreating(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau label
          </Button>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Couleur</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext
                  items={labels || []}
                  strategy={verticalListSortingStrategy}
                >
                  {labels?.map((label) => (
                    <SortableRow
                      key={label.id}
                      item={label}
                      onEdit={() => setEditingLabel(label)}
                    />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
}