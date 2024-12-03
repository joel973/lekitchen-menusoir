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
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function LabelsManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingLabel, setEditingLabel] = useState<any>(null);
  const isMobile = useIsMobile();

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
      <Card className="relative overflow-hidden glass-card animate-scale-in border-0 shadow-none">
        <div className="p-4 md:p-6">
          <div className="space-y-6">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={cn(isMobile && "px-2 py-3 text-xs")}>
                      Nom
                    </TableHead>
                    <TableHead className={cn(isMobile && "px-2 py-3 text-xs")}>
                      Couleur
                    </TableHead>
                    <TableHead className={cn("w-[100px]", isMobile && "px-2 py-3 text-xs")}>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {labels?.map((label) => (
                    <TableRow 
                      key={label.id}
                      className={cn(
                        "hover:bg-secondary/50 transition-colors",
                        isMobile && "text-sm"
                      )}
                    >
                      <TableCell className={cn(isMobile && "px-2 py-3")}>
                        {label.nom}
                      </TableCell>
                      <TableCell className={cn(isMobile && "px-2 py-3")}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded" 
                            style={{ backgroundColor: label.couleur }}
                          />
                          <span>{label.couleur}</span>
                        </div>
                      </TableCell>
                      <TableCell className={cn(isMobile && "px-2 py-3")}>
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
            </div>
          </div>
        </div>
      </Card>
    </AdminPageLayout>
  );
}