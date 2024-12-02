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
        .select(`
          *,
          categories (
            id,
            nom
          ),
          articles_allergenes (
            allergenes (
              id,
              nom
            )
          ),
          articles_labels (
            labels (
              id,
              nom,
              couleur,
              ordre
            )
          )
        `)
        .eq("statut", "actif")
        .order("created_at", { ascending: false });

      if (selectedCategory) {
        query = query.eq("categorie_id", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data.map(article => ({
        ...article,
        allergenes: article.articles_allergenes?.map(aa => aa.allergenes) || [],
        labels: (article.articles_labels?.map(al => al.labels) || [])
          .sort((a, b) => (a.ordre || 0) - (b.ordre || 0))
      }));
    },
  });

  return (
    <div className="container px-4 sm:px-6 divide-y divide-border">
      {articles?.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.nom}
          description={article.description}
          price={article.prix}
          image={article.url_image}
          allergenes={article.allergenes}
          labels={article.labels}
        />
      ))}
    </div>
  );
}