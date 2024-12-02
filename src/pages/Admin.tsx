import { useSearchParams } from "react-router-dom";
import { ArticlesManager } from "@/components/admin/ArticlesManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { AllergenesManager } from "@/components/admin/AllergenesManager";
import { LabelsManager } from "@/components/admin/LabelsManager";
import { CustomizationManager } from "@/components/admin/CustomizationManager";
import { ParametersManager } from "@/components/admin/ParametersManager";
import { EstablishmentManager } from "@/components/admin/EstablishmentManager";
import { TeamManager } from "@/components/admin/team/TeamManager";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import Rush from "./Rush";

export default function Admin() {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "rush";

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
      case "team":
        return <TeamManager />;
      default:
        return <Rush />;
    }
  };

  return (
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  );
}