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
  labels?: { nom: string; couleur: string; ordre: number }[];
  className?: string;
}

export const ArticleCard = ({
  title,
  description,
  price,
  image,
  allergenes = [],
  labels = [],
  className,
}: ArticleCardProps) => {
  const sortedLabels = [...labels].sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

  return (
    <Card className={cn(
      "group overflow-hidden border-0 shadow-none hover:bg-secondary/30 transition-colors duration-300",
      className
    )}>
      <div className="flex items-center gap-6 p-6">
        {image && (
          <div className="relative flex-shrink-0">
            <div className="h-16 w-16 overflow-hidden rounded-sm">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg tracking-tight truncate">
                  {title}
                </h3>
                {sortedLabels.length > 0 && (
                  <div className="flex gap-1">
                    {sortedLabels.map((label) => (
                      <Badge
                        key={label.nom}
                        variant="outline"
                        className="bg-white uppercase text-[9px] tracking-wider px-1.5 py-0 rounded-[2px]"
                        style={{ 
                          borderColor: label.couleur,
                          color: label.couleur
                        }}
                      >
                        {label.nom}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              {description && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {description}
                </p>
              )}

              {allergenes.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {allergenes.map((allergene) => (
                    <span
                      key={allergene.nom}
                      className="text-[9px] uppercase tracking-wider text-content-tertiary"
                    >
                      {allergene.nom}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-shrink-0">
              <span className="font-mono text-lg font-medium tracking-tight whitespace-nowrap">
                {price.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};