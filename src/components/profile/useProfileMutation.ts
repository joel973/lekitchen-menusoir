import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProfileFormValues } from "./profileFormSchema";
import { UseFormSetValue } from "react-hook-form";

export const useProfileMutation = (setValue: UseFormSetValue<ProfileFormValues>) => {
  return useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) throw new Error("User not found");

      // Update profile data first
      const updates = {
        id: session.user.id,
        first_name: values.first_name,
        last_name: values.last_name,
        updated_at: new Date().toISOString(),
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(updates);

      if (profileError) throw profileError;

      // Handle password update if all password fields are provided
      if (values.current_password && values.new_password && values.confirm_password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: values.new_password,
        });

        if (passwordError) {
          throw new Error("Erreur lors de la mise à jour du mot de passe. Vérifiez votre mot de passe actuel.");
        }
      }

      // Handle email update if changed
      if (values.email !== session.user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: values.email,
        });

        if (emailError) throw emailError;
      }
    },
    onSuccess: () => {
      toast.success("Profil mis à jour avec succès");
      // Reset password fields
      setValue("current_password", "");
      setValue("new_password", "");
      setValue("confirm_password", "");
    },
    onError: (error: any) => {
      console.error("Error updating profile:", error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour du profil");
    },
  });
};