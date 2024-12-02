import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface CategoryNavProps {
  selectedCategory?: string;
  onSelectCategory: (categoryId: string | undefined) => void;
}

export function CategoryNav({
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

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

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
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
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.5;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed top-20 left-0 right-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative flex items-center">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-md md:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex items-center gap-2 overflow-x-auto px-6 py-4"
        >
          <button
            onClick={() => onSelectCategory(undefined)}
            className={cn(
              "rounded-full bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80",
              !selectedCategory && "bg-primary text-primary-foreground"
            )}
          >
            Tous
          </button>
          {categories?.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "whitespace-nowrap rounded-full bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80",
                selectedCategory === category.id &&
                  "bg-primary text-primary-foreground"
              )}
            >
              {category.nom}
            </button>
          ))}
        </div>
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-md md:hidden"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}