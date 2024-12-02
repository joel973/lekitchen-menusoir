import { ArticleCard } from "./ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  nom: string;
  description: string | null;
  prix: number;
  url_image: string | null;
  statut: string;
}

export const ArticleGrid = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("statut", "actif");
      
      if (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }
      
      return data as Article[];
    },
  });

  if (isLoading) {
    return (
      <div className="container py-8 mt-20">
        <div className="flex flex-col divide-y">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 flex items-start justify-between gap-6"
            >
              <div className="flex-1 space-y-3">
                <div className="h-6 w-48 bg-secondary animate-pulse rounded" />
                <div className="h-4 w-96 bg-secondary animate-pulse rounded" />
                <div className="h-6 w-24 bg-secondary animate-pulse rounded" />
              </div>
              <div className="h-28 w-28 bg-secondary animate-pulse rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 mt-20">
      <div className="flex flex-col divide-y">
        {articles?.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.nom}
            description={article.description || undefined}
            price={article.prix}
            image={article.url_image || undefined}
            status={article.statut === "rupture" ? "out-of-stock" : "available"}
          />
        ))}
      </div>
    </div>
  );
};