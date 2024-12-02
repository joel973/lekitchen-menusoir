import { supabase } from "@/integrations/supabase/client";
import { type ToastProps } from "@/components/ui/toast";

export const handleImageUpload = async (
  file: File, 
  toast: { toast: (props: ToastProps) => void }
): Promise<string | null> => {
  console.log("Uploading image:", file.name);
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('article-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    toast.toast({
      variant: "destructive",
      title: "Erreur lors de l'upload de l'image",
      content: uploadError.message,
    });
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('article-images')
    .getPublicUrl(filePath);

  console.log("Image uploaded successfully:", publicUrl);
  return publicUrl;
};