import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  selectedCategory?: string;
}

export function ArticleGrid({ selectedCategory }: ArticleGridProps) {
  const { data: articles } = useQuery({
    queryKey: ["articles", selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select("*")
        .eq("statut", "actif")
        .order("created_at", { ascending: false });

      if (selectedCategory) {
        query = query.eq("categorie_id", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="mt-20 grid gap-2 p-4 md:grid-cols-2">
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
  );
}