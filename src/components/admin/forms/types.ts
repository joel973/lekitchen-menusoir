import { z } from "zod";

export const articleSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  prix: z.string().min(1, "Le prix est requis"),
  categorie_id: z.string().min(1, "La catégorie est requise"),
  statut: z.enum(["actif", "inactif", "rupture"]),
  url_image: z.string().optional(),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;

export const categorySchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  mode_affichage: z.enum(["photos", "liste"]),
  ordre: z.string().transform((val) => parseInt(val, 10)),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;