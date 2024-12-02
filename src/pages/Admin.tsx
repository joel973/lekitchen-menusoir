import { useSearchParams } from "react-router-dom";
import { ArticlesManager } from "@/components/admin/ArticlesManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { AllergenesManager } from "@/components/admin/AllergenesManager";
import { LabelsManager } from "@/components/admin/LabelsManager";
import { CustomizationManager } from "@/components/admin/CustomizationManager";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

export default function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "articles";

  console.log("Admin component - Current tab:", currentTab);

  const handleTabChange = (tab: string) => {
    console.log("Tab change requested:", tab);
    setSearchParams({ tab }, { replace: true });
  };

  const renderContent = () => {
    console.log("Rendering content for tab:", currentTab);
    switch (currentTab) {
      case "articles":
        return <ArticlesManager />;
      case "categories":
        return <CategoriesManager />;
      case "allergenes":
        return <AllergenesManager />;
      case "labels":
        return <LabelsManager />;
      case "customization":
        return <CustomizationManager />;
      default:
        return <ArticlesManager />;
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        {renderContent()}
      </div>
    </AdminLayout>
  );
}