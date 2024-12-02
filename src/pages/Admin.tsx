import { useSearchParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { AllergenesManager } from "@/components/admin/AllergenesManager";
import { ArticlesManager } from "@/components/admin/ArticlesManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { CustomizationManager } from "@/components/admin/CustomizationManager";
import { EstablishmentManager } from "@/components/admin/EstablishmentManager";
import { LabelsManager } from "@/components/admin/LabelsManager";
import { ParametersManager } from "@/components/admin/ParametersManager";
import { SupplementsManager } from "@/components/admin/SupplementsManager";
import { TeamManager } from "@/components/admin/team/TeamManager";

export default function Admin() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "rush";

  const renderContent = () => {
    switch (tab) {
      case "articles":
        return <ArticlesManager />;
      case "categories":
        return <CategoriesManager />;
      case "allergenes":
        return <AllergenesManager />;
      case "labels":
        return <LabelsManager />;
      case "supplements":
        return <SupplementsManager />;
      case "etablissement":
        return <EstablishmentManager />;
      case "team":
        return <TeamManager />;
      case "parametres":
        return <ParametersManager />;
      case "customization":
        return <CustomizationManager />;
      default:
        return <ArticlesManager />;
    }
  };

  return <AdminLayout>{renderContent()}</AdminLayout>;
}