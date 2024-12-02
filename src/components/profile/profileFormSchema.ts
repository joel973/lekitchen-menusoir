import { z } from "zod";

export const profileFormSchema = z.object({
  email: z.string().email("Email invalide"),
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  password: z.union([
    z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    z.string().length(0)
  ]),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;