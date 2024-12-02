import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  selectedCategory?: string;
}

type ArticleStatus = "actif" | "inactif" | "rupture";

export function ArticleGrid({ selectedCategory }: ArticleGridProps) {
  const { data: articles } = useQuery({
    queryKey: ["articles", selectedCategory],
    queryFn: async () => {
      console.log("Fetching articles with category:", selectedCategory);
      
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
        .in('statut', ['actif', 'rupture']);

      if (selectedCategory) {
        query = query.eq("categorie_id", selectedCategory);
      }

      const { data, error } = await query;
      
      console.log("Articles fetched:", data);
      if (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }

      return data.map(article => ({
        ...article,
        allergenes: article.articles_allergenes?.map(aa => aa.allergenes) || [],
        labels: article.articles_labels?.map(al => al.labels) || []
      }));
    },
  });

  console.log("Rendered articles:", articles);

  return (
    <div className="container max-w-3xl mx-auto px-3 sm:px-6 divide-y divide-border">
      {articles?.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.nom}
          description={article.description}
          price={article.prix}
          image={article.url_image}
          allergenes={article.allergenes}
          labels={article.labels}
          status={article.statut as ArticleStatus}
        />
      ))}
    </div>
  );
}