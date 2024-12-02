import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArticlesManager } from "@/components/admin/ArticlesManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { AllergenesManager } from "@/components/admin/AllergenesManager";
import { LabelsManager } from "@/components/admin/LabelsManager";
import { CustomizationManager } from "@/components/admin/CustomizationManager";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

export default function Admin() {
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="allergenes">Allergènes</TabsTrigger>
            <TabsTrigger value="labels">Labels</TabsTrigger>
            <TabsTrigger value="customization">Personnalisation</TabsTrigger>
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
          <TabsContent value="customization">
            <CustomizationManager />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}