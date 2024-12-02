import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import { toast } from "sonner";

const profileFormSchema = z.object({
  email: z.string().email("Email invalide"),
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  password: z.union([
    z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    z.string().length(0)
  ]),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      console.log("Fetching profile for user:", session?.user?.id);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user?.id)
        .maybeSingle();

      console.log("Profile data:", data, "Error:", error);
      
      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
      
      return data || { first_name: "", last_name: "" };
    },
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    },
    values: {
      email: session?.user?.email || "",
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      password: "",
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
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
        .upsert(updates)
        .eq("id", session.user.id);

      if (profileError) throw profileError;

      if (values.password && values.password.length > 0) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: values.password,
        });

        if (passwordError) throw passwordError;
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
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Erreur lors de la mise à jour du profil");
    },
  });

  function onSubmit(values: ProfileFormValues) {
    updateProfile.mutate(values);
  }

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe (optionnel)</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Mettre à jour
        </Button>
      </form>
    </Form>
  );
}