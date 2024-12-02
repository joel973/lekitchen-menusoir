import { Badge } from "@/components/ui/badge";

interface ArticlePriceProps {
  price: number;
  isOutOfStock: boolean;
  className?: string;
}

export const ArticlePrice = ({ price, isOutOfStock, className }: ArticlePriceProps) => {
  if (isOutOfStock) {
    return (
      <Badge variant="destructive" className="uppercase text-[10px] tracking-wider">
        Rupture
      </Badge>
    );
  }

  return (
    <span className={`text-[11px] uppercase tracking-wider font-medium text-content whitespace-nowrap ${className}`}>
      {price.toFixed(2)} €
    </span>
  );
};