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
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Articles</h1>
            <ArticlesManager />
          </div>
        );
      case "categories":
        return (
          <div className="p-6">
            <CategoriesManager />
          </div>
        );
      case "allergenes":
        return (
          <div className="p-6">
            <AllergenesManager />
          </div>
        );
      case "labels":
        return (
          <div className="p-6">
            <LabelsManager />
          </div>
        );
      case "customization":
        return (
          <div className="p-6">
            <CustomizationManager />
          </div>
        );
      case "parametres":
        return (
          <div className="p-6">
            <ParametersManager />
          </div>
        );
      case "etablissement":
        return (
          <div className="p-6">
            <EstablishmentManager />
          </div>
        );
      case "team":
        return (
          <div className="p-6">
            <TeamManager />
          </div>
        );
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