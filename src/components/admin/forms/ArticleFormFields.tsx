import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

export function ArticleFormFields() {
  const form = useFormContext();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("ordre");
      if (error) throw error;
      return data;
    },
  });

  const { data: allergenes } = useQuery({
    queryKey: ["allergenes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("allergenes")
        .select("*")
        .order("nom");
      if (error) throw error;
      return data;
    },
  });

  const { data: labels } = useQuery({
    queryKey: ["labels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("labels")
        .select("*")
        .order("nom");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="grid gap-4">
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
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="prix"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prix</FormLabel>
            <FormControl>
              <Input {...field} type="number" step="0.01" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="categorie_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Catégorie</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="statut"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Statut</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
                <SelectItem value="rupture">Rupture</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="allergenes"
        render={() => (
          <FormItem>
            <FormLabel>Allergènes</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {allergenes?.map((allergene) => (
                <FormField
                  key={allergene.id}
                  control={form.control}
                  name="allergenes"
                  render={({ field }) => (
                    <FormItem
                      key={allergene.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(allergene.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, allergene.id])
                              : field.onChange(
                                  field.value?.filter((value) => value !== allergene.id)
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {allergene.nom}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="labels"
        render={() => (
          <FormItem>
            <FormLabel>Labels</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {labels?.map((label) => (
                <FormField
                  key={label.id}
                  control={form.control}
                  name="labels"
                  render={({ field }) => (
                    <FormItem
                      key={label.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(label.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, label.id])
                              : field.onChange(
                                  field.value?.filter((value) => value !== label.id)
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {label.nom}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="image_file"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => onChange(e.target.files)}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("url_image") && (
        <div className="mt-2">
          <img
            src={form.watch("url_image")}
            alt="Preview"
            className="max-w-[200px] rounded-md"
          />
        </div>
      )}
    </div>
  );
}