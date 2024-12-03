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
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { AdminPageLayout } from "./shared/AdminPageLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function AllergenesManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingAllergene, setEditingAllergene] = useState<any>(null);
  const isMobile = useIsMobile();

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
                    <TableHead className={cn("w-[100px]", isMobile && "px-2 py-3 text-xs")}>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allergenes?.map((allergene) => (
                    <TableRow 
                      key={allergene.id}
                      className={cn(
                        "hover:bg-secondary/50 transition-colors",
                        isMobile && "text-sm"
                      )}
                    >
                      <TableCell className={cn(isMobile && "px-2 py-3")}>
                        {allergene.nom}
                      </TableCell>
                      <TableCell className={cn(isMobile && "px-2 py-3")}>
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
          </div>
        </div>
      </Card>
    </AdminPageLayout>
  );
}