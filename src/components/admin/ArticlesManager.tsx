import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil, Archive } from "lucide-react";
import { ArticleForm } from "./ArticleForm";
import { ArchivedArticles } from "./ArchivedArticles";
import { AdminPageLayout } from "./shared/AdminPageLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export function ArticlesManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showArchived, setShowArchived] = useState(false);

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

  const { data: articles, refetch } = useQuery({
    queryKey: ["admin-articles", searchQuery, selectedCategory],
    queryFn: async () => {
      console.log("Fetching articles with filters:", {
        search: searchQuery,
        category: selectedCategory,
      });
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
        .eq('statut', 'actif')
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.ilike("nom", `%${searchQuery}%`);
      }

      if (selectedCategory) {
        query = query.eq("categorie_id", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  if (selectedArticle) {
    return (
      <AdminPageLayout
        title={selectedArticle.id ? "Modifier un article" : "Nouvel article"}
      >
        <ArticleForm
          article={selectedArticle}
          onCancel={() => {
            setSelectedArticle(null);
            refetch();
          }}
        />
      </AdminPageLayout>
    );
  }

  if (showArchived) {
    return (
      <AdminPageLayout
        title="Articles archivés"
        actions={
          <Button onClick={() => setShowArchived(false)} variant="outline">
            Retour aux articles
          </Button>
        }
      >
        <ArchivedArticles />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Liste des articles"
      actions={
        <div className="flex gap-2">
          <Button onClick={() => setShowArchived(true)} variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Articles archivés
          </Button>
          <Button onClick={() => setSelectedArticle({})} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel article
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value === "all" ? undefined : value)}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {articles?.map((article) => (
            <Card key={article.id}>
              <CardContent className="flex items-center p-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{article.nom}</h3>
                  <p className="text-sm text-muted-foreground">
                    {article.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>Prix: {article.prix} €</span>
                    <span>•</span>
                    <span>Catégorie: {article.categories?.nom}</span>
                    <span>•</span>
                    <span>Statut: {article.statut}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedArticle(article)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminPageLayout>
  );
}
