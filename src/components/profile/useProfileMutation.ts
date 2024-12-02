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

      console.log("Updating profile with:", updates);

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(updates);

      if (profileError) throw profileError;

      // Handle password update if provided
      if (values.password && values.password.length > 0) {
        try {
          const { error: passwordError } = await supabase.auth.updateUser({
            password: values.password,
          });

          if (passwordError) {
            // Check if it's a same password error
            const errorBody = JSON.parse(passwordError.message);
            if (errorBody?.code === "same_password") {
              throw new Error("Le nouveau mot de passe doit être différent de l'ancien");
            }
            throw passwordError;
          }
        } catch (error: any) {
          console.error("Password update error:", error);
          // If the error is already formatted (our custom message), throw it directly
          if (error.message === "Le nouveau mot de passe doit être différent de l'ancien") {
            throw error;
          }
          // Otherwise, try to parse the error message
          try {
            const errorBody = JSON.parse(error.message);
            if (errorBody?.code === "same_password") {
              throw new Error("Le nouveau mot de passe doit être différent de l'ancien");
            }
          } catch {
            // If parsing fails, throw the original error
            throw error;
          }
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
      setValue("password", ""); // Reset password field after successful update
    },
    onError: (error: any) => {
      console.error("Error updating profile:", error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour du profil");
    },
  });
};
