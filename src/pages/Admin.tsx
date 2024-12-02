import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArticlesManager } from "@/components/admin/ArticlesManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { AllergenesManager } from "@/components/admin/AllergenesManager";
import { LabelsManager } from "@/components/admin/LabelsManager";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    
    checkAuth();

    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Administration</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Se déconnecter
        </button>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="allergenes">Allergènes</TabsTrigger>
          <TabsTrigger value="labels">Labels</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <ArticlesManager />
        </TabsContent>
        <TabsContent value="categories">
          <CategoriesManager />
        </TabsContent>
        <TabsContent value="allergenes">
          <AllergenesManager />
        </TabsContent>
        <TabsContent value="labels">
          <LabelsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}