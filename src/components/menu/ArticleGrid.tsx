import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleCard } from "./ArticleCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface ArticleGridProps {
  selectedCategory?: string;
}

export function ArticleGrid({ selectedCategory }: ArticleGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: articles } = useQuery({
    queryKey: ["articles", selectedCategory, searchQuery],
    queryFn: async () => {
      console.log("Fetching articles with filters:", {
        category: selectedCategory,
        search: searchQuery,
      });

      let query = supabase
        .from("articles")
        .select("*")
        .eq("statut", "actif")
        .order("created_at", { ascending: false });

      if (selectedCategory) {
        query = query.eq("categorie_id", selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike("nom", `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un article..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-2 p-4 md:grid-cols-2">
        {articles?.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.nom}
            description={article.description}
            price={article.prix}
            image={article.url_image}
          />
        ))}
      </div>
    </div>
  );
}