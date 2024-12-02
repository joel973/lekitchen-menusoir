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
  // Trier les labels par ordre
  const sortedLabels = [...labels].sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

  return (
    <Card className={cn(
      "group overflow-hidden border-0 shadow-none hover:bg-secondary/30 transition-colors duration-300",
      className
    )}>
      <div className="flex items-center gap-6 p-6">
        {image && (
          <div className="relative flex-shrink-0">
            <div className="h-16 w-16 overflow-hidden rounded-lg">
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
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-lg tracking-tight truncate">
                  {title}
                </h3>
                {sortedLabels.length > 0 && (
                  <div className="flex gap-1.5">
                    {sortedLabels.map((label) => (
                      <Badge
                        key={label.nom}
                        variant="secondary"
                        className="bg-[#F5F5F5] hover:bg-[#F5F5F5] text-content-secondary border-0 uppercase text-[10px] tracking-wider px-2 py-0.5"
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
                      className="text-[10px] uppercase tracking-wider text-content-tertiary"
                    >
                      {allergene.nom}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-shrink-0">
              <span className="font-display text-lg tracking-tight whitespace-nowrap">
                {price.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};