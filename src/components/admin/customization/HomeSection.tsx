import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface HomeSectionProps {
  parametres: any;
}

export function HomeSection({ parametres }: HomeSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="background_color">Couleur de fond</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            id="background_color"
            name="background_color"
            defaultValue={parametres.background_color}
            className="w-24 h-12 p-1"
          />
          <Input
            type="text"
            name="background_color"
            defaultValue={parametres.background_color}
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category_button_color">
          Couleur des boutons de catégorie
        </Label>
        <div className="flex gap-2">
          <Input
            type="color"
            id="category_button_color"
            name="category_button_color"
            defaultValue={parametres.category_button_color}
            className="w-24 h-12 p-1"
          />
          <Input
            type="text"
            name="category_button_color"
            defaultValue={parametres.category_button_color}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}