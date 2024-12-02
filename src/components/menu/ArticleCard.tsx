import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  description?: string;
  price: number;
  image?: string;
  status?: "available" | "out-of-stock";
  className?: string;
}

export const ArticleCard = ({
  title,
  description,
  price,
  image,
  status = "available",
  className,
}: ArticleCardProps) => {
  return (
    <Card className={cn("card-hover overflow-hidden", className)}>
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader className="space-y-1 p-4">
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
            <Badge variant={status === "available" ? "default" : "secondary"}>
              {price.toFixed(2)} €
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};