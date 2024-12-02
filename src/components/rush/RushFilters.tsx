import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface RushFiltersProps {
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
  selectedLabel?: string;
  onLabelChange: (label: string | undefined) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function RushFilters({
  selectedCategory,
  onCategoryChange,
  selectedLabel,
  onLabelChange,
  searchQuery,
  onSearchChange,
}: RushFiltersProps) {
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
    <div className="flex flex-col gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un article..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          value={selectedCategory}
          onValueChange={(value) => onCategoryChange(value === "all" ? undefined : value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              Toutes les catégories
            </SelectItem>
            {categories?.map((category) => (
              <SelectItem 
                key={category.id} 
                value={category.id}
              >
                {category.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedLabel}
          onValueChange={(value) => onLabelChange(value === "all" ? undefined : value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tous les labels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              Tous les labels
            </SelectItem>
            {labels?.map((label) => (
              <SelectItem 
                key={label.id} 
                value={label.id}
              >
                {label.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}