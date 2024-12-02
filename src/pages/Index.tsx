import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { ArticleGrid } from "@/components/menu/ArticleGrid";
import { Footer } from "@/components/layout/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: parametres } = useQuery({
    queryKey: ["parametres"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parametres")
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: parametres?.background_color }}
    >
      <Header />
      <main className="flex-1">
        <CategoryNav />
        <div className="py-8">
          <ArticleGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;