import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFilterProps {
  categories: any[];
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}: CategoryFilterProps) {
  return (
    <Select
      value={selectedCategory}
      onValueChange={(value) => setSelectedCategory(value === "all" ? undefined : value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Toutes les catégories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Toutes les catégories</SelectItem>
        {categories?.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.nom}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}