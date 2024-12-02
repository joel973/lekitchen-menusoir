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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tags } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const selectedAllergenes = form.watch("allergenes") || [];

  // Get the selected allergenes with their full data
  const selectedAllergenesData = allergenes?.filter((allergene) =>
    selectedAllergenes.includes(allergene.id)
  );

  const toggleAllergene = (allergeneId: string, currentlySelected: boolean) => {
    const currentValues = form.getValues("allergenes") || [];
    if (currentlySelected) {
      form.setValue(
        "allergenes",
        currentValues.filter((id) => id !== allergeneId)
      );
    } else {
      form.setValue("allergenes", [...currentValues, allergeneId]);
    }
  };

  return (
    <FormField
      control={form.control}
      name="allergenes"
      render={() => (
        <FormItem>
          <FormLabel>Allergènes</FormLabel>
          <div className="space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[200px]">
                  <Tags className="h-4 w-4 mr-2" />
                  Gérer les allergènes
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {allergenes?.map((allergene) => (
                  <DropdownMenuItem
                    key={allergene.id}
                    onClick={() =>
                      toggleAllergene(
                        allergene.id,
                        selectedAllergenes.includes(allergene.id)
                      )
                    }
                    className="flex items-center justify-between cursor-pointer data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground"
                  >
                    <span>{allergene.nom}</span>
                    {selectedAllergenes.includes(allergene.id) && (
                      <Badge variant="secondary" className="ml-2">
                        Activé
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {selectedAllergenesData && selectedAllergenesData.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedAllergenesData.map((allergene) => (
                  <Badge key={allergene.id} variant="secondary">
                    {allergene.nom}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}