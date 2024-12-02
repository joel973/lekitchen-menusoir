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

  const selectedLabels = form.watch("labels") || [];

  // Get the selected labels with their full data
  const selectedLabelsData = labels?.filter((label) =>
    selectedLabels.includes(label.id)
  );

  const toggleLabel = (labelId: string, currentlySelected: boolean) => {
    const currentValues = form.getValues("labels") || [];
    if (currentlySelected) {
      form.setValue(
        "labels",
        currentValues.filter((id) => id !== labelId)
      );
    } else {
      form.setValue("labels", [...currentValues, labelId]);
    }
  };

  return (
    <FormField
      control={form.control}
      name="labels"
      render={() => (
        <FormItem>
          <FormLabel>Labels</FormLabel>
          <div className="space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[200px]">
                  <Tags className="h-4 w-4 mr-2" />
                  Gérer les labels
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {labels?.map((label) => (
                  <DropdownMenuItem
                    key={label.id}
                    onClick={() =>
                      toggleLabel(
                        label.id,
                        selectedLabels.includes(label.id)
                      )
                    }
                    className="flex items-center justify-between cursor-pointer data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground"
                  >
                    <span>{label.nom}</span>
                    {selectedLabels.includes(label.id) && (
                      <Badge variant="secondary" className="ml-2">
                        Activé
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {selectedLabelsData && selectedLabelsData.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedLabelsData.map((label) => (
                  <Badge key={label.id} variant="secondary">
                    {label.nom}
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