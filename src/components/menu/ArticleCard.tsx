import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

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
      <div className="flex items-start justify-between p-4 gap-4">
        <div className="flex-1 space-y-2">
          <h3 className="font-display text-lg font-bold leading-none tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          <div className="pt-1">
            <span className="font-sans text-xl font-bold tracking-tight">
              {price.toFixed(2)} €
            </span>
          </div>
        </div>
        <div className="relative flex-shrink-0">
          {image && (
            <div className="h-24 w-24 overflow-hidden rounded-xl bg-secondary">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-all duration-200 hover:scale-105">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};