import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

interface LogoUploadProps {
  logoUrl?: string | null;
}

export function LogoUpload({ logoUrl }: LogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const { data: { publicUrl } } = await supabase.functions.invoke('upload-logo', {
        body: formData,
      });

      // Mettre à jour les paramètres avec la nouvelle URL du logo
      const { error: updateError } = await supabase
        .from('parametres')
        .update({ logo_url: publicUrl })
        .eq('id', 1);

      if (updateError) throw updateError;
      
      toast.success("Logo mis à jour avec succès");
      
      // Recharger la page pour voir les changements
      window.location.reload();
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error("Une erreur est survenue lors du téléchargement du logo");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleUpload}
        disabled={isUploading}
      />
      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Téléchargement en cours...</span>
        </div>
      )}
      {logoUrl && (
        <div className="mt-2">
          <img
            src={logoUrl}
            alt="Logo preview"
            className="max-w-[200px] rounded-md"
          />
        </div>
      )}
    </div>
  );
}