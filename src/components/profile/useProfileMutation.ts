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

      if (values.password && values.password.length > 0) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: values.password,
        });

        if (passwordError) {
          console.error("Password update error:", passwordError);
          if (passwordError.message.includes("same_password")) {
            throw new Error("Le nouveau mot de passe doit être différent de l'ancien");
          }
          throw passwordError;
        }
      }

      if (values.email !== session.user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: values.email,
        });

        if (emailError) throw emailError;
      }
    },
    onSuccess: () => {
      toast.success("Profil mis à jour avec succès");
      setValue("password", "");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour du profil");
    },
  });
};