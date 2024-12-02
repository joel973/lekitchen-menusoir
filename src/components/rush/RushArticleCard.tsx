import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AlertOctagon, EyeOff, Eye, Tags } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface RushArticleCardProps {
  article: any;
  labels: any[];
  onUpdate: () => void;
}

export function RushArticleCard({
  article,
  labels,
  onUpdate,
}: RushArticleCardProps) {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("articles")
        .update({ statut: newStatus })
        .eq("id", article.id);

      if (error) throw error;

      toast({
        title: "Statut mis à jour",
        description: `L'article "${article.nom}" est maintenant ${
          newStatus === "actif"
            ? "affiché"
            : newStatus === "inactif"
            ? "masqué"
            : "en rupture"
        }`,
      });
      onUpdate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleLabel = async (labelId: string, currentlySelected: boolean) => {
    console.log("Toggling label:", { labelId, currentlySelected });
    setIsUpdating(true);
    try {
      if (currentlySelected) {
        console.log("Removing label");
        const { error } = await supabase
          .from("articles_labels")
          .delete()
          .eq("article_id", article.id)
          .eq("label_id", labelId);
        if (error) throw error;
      } else {
        console.log("Adding label");
        // First check if the relation already exists
        const { data: existingLabel } = await supabase
          .from("articles_labels")
          .select("*")
          .eq("article_id", article.id)
          .eq("label_id", labelId)
          .single();

        if (!existingLabel) {
          const { error } = await supabase
            .from("articles_labels")
            .insert({ article_id: article.id, label_id: labelId });
          if (error) throw error;
        }
      }
      onUpdate();
    } catch (error: any) {
      console.error("Error toggling label:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour les labels",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const articleLabels = article.articles_labels?.map(
    (al: any) => al.label_id
  ) || [];

  const isVisible = article.statut === "actif";

  // Get the names of selected labels
  const selectedLabelsNames = labels
    .filter((label) => articleLabels.includes(label.id))
    .map((label) => label.nom);

  return (
    <Card className="overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 w-full">
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">{article.nom}</h3>
              <Badge
                variant={
                  article.statut === "actif"
                    ? "default"
                    : article.statut === "inactif"
                    ? "secondary"
                    : "destructive"
                }
                className="capitalize"
              >
                {article.statut === "actif"
                  ? "Affiché"
                  : article.statut === "inactif"
                  ? "Masqué"
                  : "Rupture"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {article.categories?.nom}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateStatus(isVisible ? "inactif" : "actif")}
              disabled={isUpdating || article.statut === "rupture"}
              className="w-32"
            >
              {isVisible ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Masquer
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Afficher
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateStatus(article.statut === "rupture" ? "actif" : "rupture")}
              disabled={isUpdating}
              className="w-32"
            >
              <AlertOctagon className="h-4 w-4 mr-2" />
              {article.statut === "rupture" ? "Disponible" : "Rupture"}
            </Button>
          </div>
        </div>

        {/* Labels Section with Dropdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm text-gray-900">Labels :</h4>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Tags className="h-4 w-4 mr-2" />
                  Gérer les labels
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {labels.map((label) => (
                  <DropdownMenuItem
                    key={label.id}
                    onClick={() => toggleLabel(label.id, articleLabels.includes(label.id))}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span>{label.nom}</span>
                    {articleLabels.includes(label.id) && (
                      <Badge variant="secondary" className="ml-2">
                        Activé
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {selectedLabelsNames.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedLabelsNames.map((labelName) => (
                <Badge key={labelName} variant="secondary">
                  {labelName}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}