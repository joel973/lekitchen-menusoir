import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function BasicArticleFields() {
  const form = useFormContext();

  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="nom"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Nom</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Description</FormLabel>
            <FormControl>
              <Textarea {...field} className="resize-none" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="prix"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Prix</FormLabel>
            <FormControl>
              <Input {...field} type="number" step="0.01" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}