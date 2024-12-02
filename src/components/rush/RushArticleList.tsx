import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RushArticleCard } from "./RushArticleCard";

interface RushArticleListProps {
  selectedCategory?: string;
  searchQuery: string;
}

export function RushArticleList({
  selectedCategory,
  searchQuery,
}: RushArticleListProps) {
  const { data: articles, refetch } = useQuery({
    queryKey: ["rush-articles", selectedCategory, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select("*, categories(nom), articles_labels(label_id)");

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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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