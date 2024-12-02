import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  title: string;
  description?: string;
  price: number;
  image?: string;
  status?: "available" | "out-of-stock";
  allergenes?: { nom: string }[];
  labels?: { nom: string; couleur: string }[];
  className?: string;
}

export const ArticleCard = ({
  title,
  description,
  price,
  image,
  status = "available",
  allergenes = [],
  labels = [],
  className,
}: ArticleCardProps) => {
  return (
    <Card className={cn(
      "group overflow-hidden border-0 shadow-none hover:bg-secondary/50 transition-colors duration-300 fade-in",
      className
    )}>
      <div className="flex items-start justify-between p-6 gap-6">
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold leading-none tracking-tight">
              {title}
            </h3>
            {labels.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {labels.map((label) => (
                  <Badge
                    key={label.nom}
                    variant="secondary"
                    style={{
                      backgroundColor: `${label.couleur}20`,
                      color: label.couleur,
                      borderColor: label.couleur,
                    }}
                    className="text-xs"
                  >
                    {label.nom}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          
          <div className="flex items-center gap-4">
            <span className="font-sans text-xl font-bold tracking-tight">
              {price.toFixed(2)} €
            </span>
          </div>

          {allergenes.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {allergenes.map((allergene) => (
                <span
                  key={allergene.nom}
                  className="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive"
                >
                  {allergene.nom}
                </span>
              ))}
            </div>
          )}
        </div>

        {image && (
          <div className="relative flex-shrink-0">
            <div className="h-28 w-28 overflow-hidden rounded-2xl bg-secondary">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};