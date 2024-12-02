import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className={cn("card-hover overflow-hidden fade-in", className)}>
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="space-y-2 p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-display text-lg font-medium leading-none">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="ml-2">
            <span className="font-display text-2xl font-bold">
              {price.toFixed(2)} €
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {allergens.map((allergen, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs menu-transition hover:bg-primary hover:text-primary-foreground"
            >
              {allergen}
            </Badge>
          ))}
          {prepTime && (
            <Badge 
              variant="secondary" 
              className="text-xs menu-transition hover:bg-accent hover:text-accent-foreground"
            >
              {prepTime}
            </Badge>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};