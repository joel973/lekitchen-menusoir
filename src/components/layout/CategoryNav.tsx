import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Category {
  id: string;
  nom: string;
  mode_affichage: string;
  ordre: number;
}

export const CategoryNav = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

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

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScroll();
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [categories]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -200 : 200;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-20 z-40 border-b">
        <div className="flex w-max space-x-4 p-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-32 animate-pulse rounded-full bg-secondary"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-20 z-40 border-b fade-in">
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-full shadow-lg"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 p-6"
      >
        {categories?.map((category) => (
          <button
            key={category.id}
            className={cn(
              "menu-transition inline-flex items-center rounded-full px-8 py-3 text-sm font-medium tracking-tight transition-colors whitespace-nowrap",
              category.ordre === 0
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {category.nom}
          </button>
        ))}
      </div>
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-full shadow-lg"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};