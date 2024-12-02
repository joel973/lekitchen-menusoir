import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  selectedCategory?: string;
  onSelectCategory: (categoryId: string | undefined) => void;
}

export const CategoryNav = ({
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) => {
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

  return (
    <nav className="sticky top-20 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 flex items-center overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "rounded-[4px] font-medium transition-colors hover:bg-secondary whitespace-nowrap",
                selectedCategory === category.id && "bg-secondary text-content"
              )}
            >
              {category.nom}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}