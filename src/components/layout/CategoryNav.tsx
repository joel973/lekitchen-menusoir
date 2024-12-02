import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  nom: string;
  mode_affichage: string;
  ordre: number;
}

export const CategoryNav = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("ordre");
      
      if (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
      
      return data as Category[];
    },
  });

  if (isLoading) {
    return (
      <ScrollArea className="w-full whitespace-nowrap bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-20 z-40 border-b">
        <div className="flex w-max space-x-4 p-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-32 animate-pulse rounded-full bg-secondary"
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="opacity-0" />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-20 z-40 border-b fade-in">
      <div className="flex w-max space-x-4 p-6">
        {categories?.map((category) => (
          <button
            key={category.id}
            className={cn(
              "menu-transition inline-flex items-center rounded-full px-8 py-3 text-sm font-medium tracking-tight transition-colors",
              category.ordre === 0
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {category.nom}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="opacity-0" />
    </ScrollArea>
  );
};