import { RushArticleList } from "@/components/rush/RushArticleList";
import { RushFilters } from "@/components/rush/RushFilters";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Rush() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedLabel, setSelectedLabel] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Rush - Gestion rapide</h1>
        </div>
      </div>
      <div 
        className="space-y-6 rounded-lg border p-6"
        style={{ 
          backgroundColor: parametres?.card_background_color,
          boxShadow: parametres?.card_shadow === 'shadow-none' ? 'none' :
                     parametres?.card_shadow === 'shadow-sm' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' :
                     parametres?.card_shadow === 'shadow-md' ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' :
                     '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        }}
      >
        <RushFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedLabel={selectedLabel}
          onLabelChange={setSelectedLabel}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <RushArticleList
          selectedCategory={selectedCategory}
          selectedLabel={selectedLabel}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}