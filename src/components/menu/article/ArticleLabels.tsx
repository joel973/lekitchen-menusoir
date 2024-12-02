import { Badge } from "@/components/ui/badge";

interface ArticleLabelsProps {
  labels: { nom: string; couleur: string; ordre: number }[];
}

export const ArticleLabels = ({ labels }: ArticleLabelsProps) => {
  const sortedLabels = [...labels].sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

  if (sortedLabels.length === 0) return null;

  return (
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
  );
};