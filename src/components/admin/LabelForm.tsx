import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { labelSchema, type LabelFormValues } from "./forms/types";
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

interface LabelFormProps {
  label?: any;
  onCancel: () => void;
}

export function LabelForm({ label, onCancel }: LabelFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<LabelFormValues>({
    resolver: zodResolver(labelSchema),
    defaultValues: label || {
      nom: "",
      couleur: "#E5DEFF",
    },
  });

  const onSubmit = async (values: LabelFormValues) => {
    console.log("Form values:", values);
    setIsSubmitting(true);
    try {
      if (label?.id) {
        const { error } = await supabase
          .from("labels")
          .update({ nom: values.nom, couleur: values.couleur })
          .eq("id", label.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("labels")
          .insert({ nom: values.nom, couleur: values.couleur });
        if (error) throw error;
      }

      await queryClient.invalidateQueries({ queryKey: ["labels"] });
      toast({
        title: "Succès",
        description: label?.id
          ? "Label modifié avec succès"
          : "Label créé avec succès",
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
        <FormField
          control={form.control}
          name="couleur"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Couleur</FormLabel>
              <FormControl>
                <div className="flex gap-2 items-center">
                  <Input
                    type="color"
                    {...field}
                    className="w-24 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    {...field}
                    className="flex-1"
                    placeholder="#E5DEFF"
                  />
                </div>
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
            {label?.id ? "Modifier" : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}