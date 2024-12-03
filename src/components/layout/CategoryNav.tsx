import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CategoryNavProps {
  selectedCategory?: string;
}

export const CategoryNav = ({ selectedCategory }: CategoryNavProps) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const { data: parametres } = useQuery({
    queryKey: ["parametres"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parametres")
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
  });

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-20 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 flex items-center justify-center">
        <div className="relative w-full max-w-2xl mx-auto">
          {showLeftArrow && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-background/80 via-background/60 to-transparent w-8 h-full flex items-center justify-start sm:hidden">
              <ChevronLeft className="h-4 w-4 text-content-secondary" />
            </div>
          )}
          
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto no-scrollbar"
          >
            <div className="flex items-center justify-center gap-2 px-6 sm:px-0">
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToCategory(category.id)}
                  className={cn(
                    "rounded-[4px] font-medium transition-colors whitespace-nowrap hover:brightness-95",
                    selectedCategory === category.id && "text-content"
                  )}
                  style={{
                    backgroundColor: parametres?.category_button_color
                  }}
                >
                  {category.nom}
                </Button>
              ))}
            </div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-background/80 via-background/60 to-transparent w-8 h-full flex items-center justify-end sm:hidden">
            <ChevronRight className="h-4 w-4 text-content-secondary" />
          </div>
        </div>
      </div>
    </nav>
  );
}