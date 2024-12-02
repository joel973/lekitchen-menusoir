import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplementSchema, type SupplementFormValues } from "./forms/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useSupplementFormSubmit } from "./forms/useSupplementFormSubmit";
import { BasicSupplementFields } from "./forms/fields/BasicSupplementFields";

interface SupplementFormProps {
  supplement?: any;
  onCancel: () => void;
}

export function SupplementForm({ supplement, onCancel }: SupplementFormProps) {
  const form = useForm<SupplementFormValues>({
    resolver: zodResolver(supplementSchema),
    defaultValues: supplement || {
      prix: "0",
    },
  });

  const { onSubmit, isSubmitting } = useSupplementFormSubmit(supplement, onCancel);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <BasicSupplementFields />
            
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {supplement ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}