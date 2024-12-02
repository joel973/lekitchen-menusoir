import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, XOctagon } from "lucide-react";

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
    setIsUpdating(true);
    try {
      if (currentlySelected) {
        const { error } = await supabase
          .from("articles_labels")
          .delete()
          .eq("article_id", article.id)
          .eq("label_id", labelId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("articles_labels")
          .insert({ article_id: article.id, label_id: labelId });
        if (error) throw error;
      }
      onUpdate();
    } catch (error: any) {
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

  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-semibold">{article.nom}</h3>
            <p className="text-sm text-muted-foreground">
              {article.categories?.nom}
            </p>
          </div>
          <Badge
            variant={
              article.statut === "actif"
                ? "default"
                : article.statut === "inactif"
                ? "secondary"
                : "destructive"
            }
          >
            {article.statut === "actif"
              ? "Affiché"
              : article.statut === "inactif"
              ? "Masqué"
              : "Rupture"}
          </Badge>
        </div>
      </div>

      <div className="border-b p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateStatus("actif")}
            disabled={isUpdating || article.statut === "actif"}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            Afficher
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateStatus("inactif")}
            disabled={isUpdating || article.statut === "inactif"}
            className="flex-1"
          >
            <EyeOff className="h-4 w-4 mr-2" />
            Masquer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateStatus("rupture")}
            disabled={isUpdating || article.statut === "rupture"}
            className="flex-1"
          >
            <XOctagon className="h-4 w-4 mr-2" />
            Rupture
          </Button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm font-medium mb-3">Labels :</p>
        <div className="grid grid-cols-2 gap-3">
          {labels.map((label) => (
            <div
              key={label.id}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={`label-${article.id}-${label.id}`}
                checked={articleLabels.includes(label.id)}
                onCheckedChange={(checked) =>
                  toggleLabel(label.id, checked as boolean)
                }
                disabled={isUpdating}
              />
              <label
                htmlFor={`label-${article.id}-${label.id}`}
                className="text-sm"
              >
                {label.nom}
              </label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}