import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { allergeneSchema, type AllergeneFormValues } from "./forms/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AllergeneFormProps {
  allergene?: any;
  onCancel: () => void;
}

export function AllergeneForm({ allergene, onCancel }: AllergeneFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<AllergeneFormValues>({
    resolver: zodResolver(allergeneSchema),
    defaultValues: allergene || {
      nom: "",
    },
  });

  const onSubmit = async (values: AllergeneFormValues) => {
    console.log("Form values:", values);
    setIsSubmitting(true);
    try {
      if (allergene?.id) {
        const { error } = await supabase
          .from("allergenes")
          .update(values)
          .eq("id", allergene.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("allergenes").insert([values]);
        if (error) throw error;
      }

      await queryClient.invalidateQueries({ queryKey: ["allergenes"] });
      toast({
        title: "Succès",
        description: allergene?.id
          ? "Allergène modifié avec succès"
          : "Allergène créé avec succès",
      });
      onCancel();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {allergene?.id ? "Modifier" : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}