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

export function LabelsCheckboxes() {
  const form = useFormContext();

  const { data: labels } = useQuery({
    queryKey: ["labels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("labels")
        .select("*")
        .order("ordre");
      if (error) throw error;
      return data;
    },
  });

  return (
    <FormField
      control={form.control}
      name="labels"
      render={() => (
        <FormItem>
          <FormLabel>Labels</FormLabel>
          <div className="grid grid-cols-2 gap-2">
            {labels?.map((label) => (
              <FormField
                key={label.id}
                control={form.control}
                name="labels"
                render={({ field }) => (
                  <FormItem
                    key={label.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                    style={{ backgroundColor: `${label.couleur}20` }}
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(label.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, label.id])
                            : field.onChange(
                                field.value?.filter((value) => value !== label.id)
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{label.nom}</FormLabel>
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