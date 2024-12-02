import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArticleForm } from "./ArticleForm";

export function ArticlesManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  const { data: articles, isLoading } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, categories(nom)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isCreating || editingArticle) {
    return (
      <ArticleForm
        article={editingArticle}
        onCancel={() => {
          setIsCreating(false);
          setEditingArticle(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Button onClick={() => setIsCreating(true)}>Nouvel article</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles?.map((article) => (
            <TableRow key={article.id}>
              <TableCell>{article.nom}</TableCell>
              <TableCell>{article.categories?.nom}</TableCell>
              <TableCell>{article.prix}€</TableCell>
              <TableCell>{article.statut}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingArticle(article)}
                >
                  Modifier
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}