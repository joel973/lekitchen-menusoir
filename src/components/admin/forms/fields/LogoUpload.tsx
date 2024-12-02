import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function LogoUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const form = useFormContext();
  const { toast } = useToast();

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

      form.setValue('logo_url', publicUrl);
      
      toast({
        title: "Logo mis à jour",
        description: "Le logo a été téléchargé avec succès.",
      });
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement du logo.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="logo_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Logo</FormLabel>
            <FormControl>
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
                {field.value && (
                  <div className="mt-2">
                    <img
                      src={field.value}
                      alt="Logo preview"
                      className="max-w-[200px] rounded-md"
                    />
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}