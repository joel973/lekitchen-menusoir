import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  selectedCategory?: string;
}

type ArticleStatus = "actif" | "inactif" | "rupture";

export function ArticleGrid({ selectedCategory }: ArticleGridProps) {
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

  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
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

      if (error) throw error;

      return data.map(article => ({
        ...article,
        allergenes: article.articles_allergenes?.map(aa => aa.allergenes) || [],
        labels: article.articles_labels?.map(al => al.labels) || []
      }));
    },
  });

  return (
    <div className="container max-w-3xl mx-auto px-3 sm:px-6 space-y-12">
      {categories?.map((category) => {
        const categoryArticles = articles?.filter(
          (article) => article.categorie_id === category.id
        );

        if (!categoryArticles?.length) return null;

        return (
          <section 
            key={category.id} 
            id={`category-${category.id}`}
            className="scroll-mt-36"
          >
            <h2 className="text-xl font-display font-medium mb-6">
              {category.nom}
            </h2>
            <div className="divide-y divide-border">
              {categoryArticles.map((article) => (
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
          </section>
        );
      })}
    </div>
  );
}