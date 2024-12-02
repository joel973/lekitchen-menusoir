import { useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ImageUpload() {
  const form = useFormContext();

  const handleDeleteImage = () => {
    form.setValue("url_image", null);
    form.setValue("image_file", undefined);
  };

  return (
    <>
      <FormField
        control={form.control}
        name="image_file"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => onChange(e.target.files)}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("url_image") && (
        <div className="mt-2 space-y-2">
          <img
            src={form.watch("url_image")}
            alt="Preview"
            className="max-w-[200px] rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDeleteImage}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer l'image
          </Button>
        </div>
      )}
    </>
  );
}