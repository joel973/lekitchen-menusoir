import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function AllergenesCheckboxes() {
  const form = useFormContext();

  const { data: allergenes } = useQuery({
    queryKey: ["allergenes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("allergenes")
        .select("*")
        .order("nom");
      if (error) throw error;
      return data;
    },
  });

  return (
    <FormField
      control={form.control}
      name="allergenes"
      render={() => (
        <FormItem>
          <FormLabel>Allergènes</FormLabel>
          <div className="grid grid-cols-2 gap-2">
            {allergenes?.map((allergene) => (
              <FormField
                key={allergene.id}
                control={form.control}
                name="allergenes"
                render={({ field }) => (
                  <FormItem
                    key={allergene.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(allergene.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, allergene.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== allergene.id
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {allergene.nom}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}