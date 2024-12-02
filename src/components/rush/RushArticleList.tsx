import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RushArticleCard } from "./RushArticleCard";

interface RushArticleListProps {
  selectedCategory?: string;
  selectedLabel?: string;
  searchQuery: string;
}

export function RushArticleList({
  selectedCategory,
  selectedLabel,
  searchQuery,
}: RushArticleListProps) {
  const { data: articles, refetch } = useQuery({
    queryKey: ["rush-articles", selectedCategory, selectedLabel, searchQuery],
    queryFn: async () => {
      console.log("Fetching articles with filters:", {
        category: selectedCategory,
        label: selectedLabel,
        search: searchQuery,
      });

      let query = supabase
        .from("articles")
        .select("*, categories(nom), articles_labels(label_id)");

      if (selectedCategory) {
        query = query.eq("categorie_id", selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike("nom", `%${searchQuery}%`);
      }

      const { data: articlesData, error } = await query;
      if (error) throw error;

      // Si un label est sélectionné, filtrer les articles qui ont ce label
      if (selectedLabel && articlesData) {
        return articlesData.filter((article) =>
          article.articles_labels?.some((al) => al.label_id === selectedLabel)
        );
      }

      return articlesData;
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
    <div className="space-y-4">
      {articles?.map((article) => (
        <RushArticleCard
          key={article.id}
          article={article}
          labels={labels || []}
          onUpdate={() => refetch()}
        />
      ))}
    </div>
  );
}