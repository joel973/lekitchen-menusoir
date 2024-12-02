import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LogoUpload } from "../forms/fields/LogoUpload";

interface HeaderSectionProps {
  parametres: any;
}

export function HeaderSection({ parametres }: HeaderSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="use_logo"
          name="use_logo"
          defaultChecked={parametres.use_logo}
        />
        <Label htmlFor="use_logo">Utiliser un logo</Label>
      </div>

      {parametres.use_logo ? (
        <LogoUpload logoUrl={parametres.logo_url} />
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="header_text">Texte de l'en-tête</Label>
            <Input
              id="header_text"
              name="header_text"
              defaultValue={parametres.header_text}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="header_text_color">Couleur du texte</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="header_text_color"
                name="header_text_color"
                defaultValue={parametres.header_text_color}
                className="w-24 h-12 p-1"
              />
              <Input
                type="text"
                name="header_text_color"
                defaultValue={parametres.header_text_color}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}