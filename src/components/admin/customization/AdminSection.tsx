import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AdminSectionProps {
  parametres: any;
}

export function AdminSection({ parametres }: AdminSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="couleur_primaire">Couleur principale</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            id="couleur_primaire"
            name="couleur_primaire"
            defaultValue={parametres.couleur_primaire}
            className="w-24 h-12 p-1"
          />
          <Input
            type="text"
            name="couleur_primaire"
            defaultValue={parametres.couleur_primaire}
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="card_background_color">
          Couleur de fond des cartes
        </Label>
        <div className="flex gap-2">
          <Input
            type="color"
            id="card_background_color"
            name="card_background_color"
            defaultValue={parametres.card_background_color}
            className="w-24 h-12 p-1"
          />
          <Input
            type="text"
            name="card_background_color"
            defaultValue={parametres.card_background_color}
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="card_shadow">Ombrage des cartes</Label>
        <select
          id="card_shadow"
          name="card_shadow"
          defaultValue={parametres.card_shadow}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="shadow-none">Aucun</option>
          <option value="shadow-sm">Léger</option>
          <option value="shadow-md">Moyen</option>
          <option value="shadow-lg">Fort</option>
        </select>
      </div>
    </div>
  );
}