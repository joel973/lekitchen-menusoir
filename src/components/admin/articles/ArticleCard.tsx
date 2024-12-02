import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";

interface ArticleCardProps {
  article: any;
  onEdit: (article: any) => void;
}

export function ArticleCard({ article, onEdit }: ArticleCardProps) {
  return (
    <Card key={article.id} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{article.nom}</h3>
              {article.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(article)}
              className="shrink-0 ml-4"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span>Prix: {article.prix} €</span>
            <span>•</span>
            <span>Catégorie: {article.categories?.nom}</span>
            <span>•</span>
            <span className="capitalize">Statut: {article.statut}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}