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
    <Card className={cn("group overflow-hidden border-0 shadow-none hover:bg-gray-50 transition-all duration-300 fade-in", className)}>
      <div className="flex items-start justify-between p-4">
        <div className="flex-1 space-y-2">
          <h3 className="font-display text-xl font-bold leading-none tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors duration-200">
              {description}
            </p>
          )}
          <div className="pt-1">
            <span className="font-display text-2xl font-bold text-primary transition-colors duration-200">
              {price.toFixed(2)} €
            </span>
          </div>
        </div>
        <div className="relative ml-4 flex-shrink-0">
          {image && (
            <div className="h-24 w-24 overflow-hidden rounded-xl transform group-hover:scale-105 transition-transform duration-300">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transform hover:scale-110 transition-all duration-200">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};