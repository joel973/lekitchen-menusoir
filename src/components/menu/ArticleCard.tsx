import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArticleModal } from "./ArticleModal";
import { ChevronRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  description?: string;
  price: number;
  image?: string;
  status?: "actif" | "inactif" | "rupture";
  allergenes?: { nom: string }[];
  labels?: { nom: string; couleur: string; ordre: number }[];
  className?: string;
}

export const ArticleCard = ({
  title,
  description,
  price,
  image,
  status = "actif",
  allergenes = [],
  labels = [],
  className,
}: ArticleCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sortedLabels = [...labels].sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

  const isOutOfStock = status === "rupture";

  return (
    <>
      <Card 
        className={cn(
          "group overflow-hidden border-0 shadow-none hover:bg-secondary/30 transition-colors duration-300 cursor-pointer",
          isOutOfStock && "opacity-50",
          className
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex gap-4 p-4 sm:p-6">
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

          <div className="min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
              <div className="space-y-1 min-w-0">
                <h3 className="font-display text-base sm:text-lg tracking-tight">
                  {title}
                </h3>
                
                {sortedLabels.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {sortedLabels.map((label) => (
                      <Badge
                        key={label.nom}
                        variant="outline"
                        className="bg-white uppercase text-[8px] tracking-wider px-1.5 py-0 rounded-[2px]"
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

                {/* Prix en version desktop */}
                <div className="hidden sm:block">
                  {isOutOfStock ? (
                    <Badge variant="destructive" className="uppercase text-[10px] tracking-wider">
                      Rupture
                    </Badge>
                  ) : (
                    <span className="text-[11px] uppercase tracking-wider font-medium text-content whitespace-nowrap">
                      {price.toFixed(2)} €
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Prix en version mobile */}
                <div className="sm:hidden">
                  {isOutOfStock ? (
                    <Badge variant="destructive" className="uppercase text-[10px] tracking-wider">
                      Rupture
                    </Badge>
                  ) : (
                    <span className="text-[11px] uppercase tracking-wider font-medium text-content whitespace-nowrap">
                      {price.toFixed(2)} €
                    </span>
                  )}
                </div>
                <button className="text-[10px] text-content-tertiary uppercase tracking-wider flex items-center gap-0.5 group-hover:text-content transition-colors">
                  Plus d'infos
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <ArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        price={price}
        image={image}
        allergenes={allergenes}
        labels={labels}
      />
    </>
  );
};