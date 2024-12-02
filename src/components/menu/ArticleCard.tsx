import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  description?: string;
  price: number;
  image?: string;
  status?: "available" | "out-of-stock";
  allergens?: string[];
  prepTime?: string;
  className?: string;
}

export const ArticleCard = ({
  title,
  description,
  price,
  image,
  status = "available",
  allergens = [],
  prepTime,
  className,
}: ArticleCardProps) => {
  return (
    <Card className={cn("group overflow-hidden border-0 shadow-none hover:bg-secondary/50 transition-colors duration-300 fade-in", className)}>
      <div className="flex items-start justify-between p-6 gap-6">
        <div className="flex-1 space-y-3">
          <h3 className="font-display text-xl font-bold leading-none tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          <div className="flex items-center gap-4">
            <span className="font-sans text-xl font-bold tracking-tight">
              {price.toFixed(2)} €
            </span>
            {prepTime && (
              <span className="text-xs text-muted-foreground">
                {prepTime}
              </span>
            )}
          </div>
          {allergens.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {allergens.map((allergen) => (
                <span
                  key={allergen}
                  className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {allergen}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="relative flex-shrink-0">
          {image && (
            <div className="h-28 w-28 overflow-hidden rounded-2xl bg-secondary">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};