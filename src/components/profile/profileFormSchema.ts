import { z } from "zod";

export const profileFormSchema = z.object({
  email: z.string().email("Email invalide"),
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  current_password: z.union([
    z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    z.string().length(0)
  ]),
  new_password: z.union([
    z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    z.string().length(0)
  ]),
  confirm_password: z.union([
    z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    z.string().length(0)
  ]),
}).refine((data) => {
  // Si l'un des champs de mot de passe est rempli, tous doivent l'être
  const hasPassword = data.current_password.length > 0 || 
                     data.new_password.length > 0 || 
                     data.confirm_password.length > 0;
  
  if (hasPassword) {
    return data.current_password.length >= 6 && 
           data.new_password.length >= 6 && 
           data.confirm_password.length >= 6;
  }
  
  return true;
}, "Tous les champs de mot de passe sont requis pour effectuer un changement").refine((data) => {
  if (data.new_password.length > 0) {
    return data.new_password === data.confirm_password;
  }
  return true;
}, "Les nouveaux mots de passe ne correspondent pas");

export type ProfileFormValues = z.infer<typeof profileFormSchema>;