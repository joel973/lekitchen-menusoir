import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function SupplementsCheckboxes() {
  const form = useFormContext();

  const { data: supplements } = useQuery({
    queryKey: ["supplements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("supplements")
        .select("*")
        .order("nom");
      if (error) throw error;
      return data;
    },
  });

  return (
    <FormField
      control={form.control}
      name="supplements"
      render={() => (
        <FormItem>
          <FormLabel className="text-base font-semibold">Suppléments</FormLabel>
          <div className="grid gap-4 pt-2">
            {supplements?.map((supplement) => (
              <FormField
                key={supplement.id}
                control={form.control}
                name="supplements"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={supplement.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={Array.isArray(field.value) && field.value?.includes(supplement.id)}
                          onCheckedChange={(checked) => {
                            const currentValue = Array.isArray(field.value) ? field.value : [];
                            return checked
                              ? field.onChange([...currentValue, supplement.id])
                              : field.onChange(
                                  currentValue?.filter((value) => value !== supplement.id)
                                );
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          {supplement.nom} (+{supplement.prix}€)
                        </FormLabel>
                      </div>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}