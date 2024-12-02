import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Archive, Plus } from "lucide-react";
import { ArticleForm } from "./ArticleForm";
import { ArchivedArticles } from "./ArchivedArticles";
import { AdminPageLayout } from "./shared/AdminPageLayout";
import { ArticleSearchBar } from "./articles/ArticleSearchBar";
import { CategoryFilter } from "./articles/CategoryFilter";
import { ArticleCard } from "./articles/ArticleCard";

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
          <Button onClick={() => setShowArchived(true)} variant="outline" size="sm" className="hidden sm:flex">
            <Archive className="h-4 w-4 mr-2" />
            Articles archivés
          </Button>
          <Button 
            onClick={() => setSelectedArticle({})} 
            size="sm" 
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvel article
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <ArticleSearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <CategoryFilter
            categories={categories || []}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          
          {/* Bouton Archives en version mobile */}
          <Button 
            onClick={() => setShowArchived(true)} 
            variant="outline" 
            size="sm" 
            className="sm:hidden w-full justify-center"
          >
            <Archive className="h-4 w-4 mr-2" />
            Articles archivés
          </Button>
        </div>

        <div className="space-y-4">
          {articles?.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={setSelectedArticle}
            />
          ))}
        </div>
      </div>
    </AdminPageLayout>
  );
}