import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  price: number;
  image?: string;
  allergenes?: { nom: string }[];
  labels?: { nom: string; couleur: string; ordre: number }[];
}

export function ArticleModal({
  isOpen,
  onClose,
  title,
  description,
  price,
  image,
  allergenes = [],
  labels = [],
}: ArticleModalProps) {
  const sortedLabels = [...labels].sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl tracking-tight">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {image && (
            <div className="overflow-hidden rounded-md">
              <img
                src={image}
                alt={title}
                className="h-[300px] w-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            {sortedLabels.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {sortedLabels.map((label) => (
                  <Badge
                    key={label.nom}
                    variant="outline"
                    className="bg-white uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-[2px]"
                    style={{
                      borderColor: label.couleur,
                      color: label.couleur,
                    }}
                  >
                    {label.nom}
                  </Badge>
                ))}
              </div>
            )}

            {description && (
              <p className="text-content-secondary leading-relaxed">
                {description}
              </p>
            )}

            {allergenes.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-content-tertiary">
                  Allergènes
                </span>
                <div className="flex flex-wrap gap-2">
                  {allergenes.map((allergene) => (
                    <span
                      key={allergene.nom}
                      className="text-[10px] uppercase tracking-wider text-content-tertiary"
                    >
                      {allergene.nom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider font-medium text-content">
                {price.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}