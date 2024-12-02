import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertOctagon, EyeOff, Eye, Tags } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLabelsManagement } from "./hooks/useLabelsManagement";
import { useArticleStatus } from "./hooks/useArticleStatus";
import { ArticleHeader } from "./components/ArticleHeader";

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
  const { toggleLabel, isUpdating: isUpdatingLabels } = useLabelsManagement(
    article.id,
    onUpdate
  );
  const { updateStatus, isUpdating: isUpdatingStatus } = useArticleStatus(
    article.id,
    onUpdate
  );

  const articleLabels = article.articles_labels?.map(
    (al: any) => al.label_id
  ) || [];

  const isVisible = article.statut === "actif";
  const isDisabled = isUpdatingLabels || isUpdatingStatus;

  const selectedLabels = labels.filter((label) => articleLabels.includes(label.id));

  return (
    <Card className="overflow-hidden border-0 shadow-none w-full bg-transparent">
      <div className="p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <ArticleHeader
            nom={article.nom}
            statut={article.statut}
            categorie={article.categories?.nom}
          />
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateStatus(isVisible ? "inactif" : "actif")}
              disabled={isDisabled || article.statut === "rupture"}
              className="w-full sm:w-32"
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
              onClick={() =>
                updateStatus(article.statut === "rupture" ? "actif" : "rupture")
              }
              disabled={isDisabled}
              className="w-full sm:w-32"
            >
              <AlertOctagon className="h-4 w-4 mr-2" />
              {article.statut === "rupture" ? "Disponible" : "Rupture"}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
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
                    onClick={() =>
                      toggleLabel(label.id, articleLabels.includes(label.id))
                    }
                    className="flex items-center justify-between cursor-pointer"
                    style={{ backgroundColor: articleLabels.includes(label.id) ? `${label.couleur}20` : undefined }}
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
          {selectedLabels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedLabels.map((label) => (
                <Badge 
                  key={label.id} 
                  variant="secondary"
                  style={{ 
                    backgroundColor: `${label.couleur}20`,
                    color: label.couleur,
                    borderColor: label.couleur
                  }}
                >
                  {label.nom}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}