import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ArticleForm } from "./ArticleForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function ArticlesManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: articles, refetch } = useQuery({
    queryKey: ["admin-articles", searchQuery],
    queryFn: async () => {
      console.log("Fetching articles with search:", searchQuery);
      let query = supabase
        .from("articles")
        .select(`
          *,
          categories (
            id,
            nom
          ),
          articles_allergenes (
            allergene_id,
            allergenes (
              id,
              nom
            )
          ),
          articles_labels (
            label_id,
            labels (
              id,
              nom
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.ilike("nom", `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleArticleSubmit = async () => {
    setIsDialogOpen(false);
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Articles</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Ajouter un article</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <ArticleForm onSubmit={handleArticleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative w-full max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un article..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 w-full"
        />
      </div>

      <div className="space-y-4">
        {articles?.map((article) => (
          <div key={article.id} className="border-b border-muted-foreground py-4">
            <h2 className="text-lg font-semibold">{article.nom}</h2>
            <p>{article.description}</p>
            <p className="text-sm text-muted-foreground">Prix: {article.prix} €</p>
            <p className="text-sm text-muted-foreground">Catégorie: {article.categories.nom}</p>
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
