import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FooterSectionProps {
  parametres: any;
}

export function FooterSection({ parametres }: FooterSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="pied_page_texte">Texte du pied de page</Label>
      <Textarea
        id="pied_page_texte"
        name="pied_page_texte"
        defaultValue={parametres.pied_page_texte || ""}
        placeholder="Entrez le texte du pied de page"
        className="min-h-[100px]"
      />
    </div>
  );
}