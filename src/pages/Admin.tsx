import { useSearchParams } from "react-router-dom";
import { ArticlesManager } from "@/components/admin/ArticlesManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { AllergenesManager } from "@/components/admin/AllergenesManager";
import { LabelsManager } from "@/components/admin/LabelsManager";
import { CustomizationManager } from "@/components/admin/CustomizationManager";
import { ParametersManager } from "@/components/admin/ParametersManager";
import { EstablishmentManager } from "@/components/admin/EstablishmentManager";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import Rush from "./Rush";

export default function Admin() {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "articles";

  const renderContent = () => {
    switch (currentTab) {
      case "rush":
        return <Rush />;
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
      case "parametres":
        return <ParametersManager />;
      case "etablissement":
        return <EstablishmentManager />;
      default:
        return <ArticlesManager />;
    }
  };

  return (
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  );
}