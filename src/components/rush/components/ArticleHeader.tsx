import { Badge } from "@/components/ui/badge";

interface ArticleHeaderProps {
  nom: string;
  statut: string;
  categorie?: string;
}

export function ArticleHeader({ nom, statut, categorie }: ArticleHeaderProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold text-gray-900">{nom}</h3>
        <Badge
          variant={
            statut === "actif"
              ? "default"
              : statut === "inactif"
              ? "secondary"
              : "destructive"
          }
          className="capitalize"
        >
          {statut === "actif"
            ? "Affiché"
            : statut === "inactif"
            ? "Masqué"
            : "Rupture"}
        </Badge>
      </div>
      {categorie && (
        <p className="text-sm text-muted-foreground">{categorie}</p>
      )}
    </div>
  );
}