import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function ImageUpload() {
  const form = useFormContext();

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
        <div className="mt-2">
          <img
            src={form.watch("url_image")}
            alt="Preview"
            className="max-w-[200px] rounded-md"
          />
        </div>
      )}
    </>
  );
}