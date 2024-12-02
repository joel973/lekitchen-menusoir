import { useSearchParams } from "react-router-dom";
import { ArticlesManager } from "@/components/admin/ArticlesManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { AllergenesManager } from "@/components/admin/AllergenesManager";
import { LabelsManager } from "@/components/admin/LabelsManager";
import { CustomizationManager } from "@/components/admin/CustomizationManager";
import { ParametersManager } from "@/components/admin/ParametersManager";
import { EstablishmentManager } from "@/components/admin/EstablishmentManager";
import { TeamManager } from "@/components/admin/team/TeamManager";
import { SupplementsManager } from "@/components/admin/SupplementsManager";
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
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Articles</h1>
              </div>
            </div>
            <ArticlesManager />
          </div>
        );
      case "categories":
        return (
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Catégories</h1>
              </div>
            </div>
            <CategoriesManager />
          </div>
        );
      case "allergenes":
        return (
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Allergènes</h1>
              </div>
            </div>
            <AllergenesManager />
          </div>
        );
      case "labels":
        return (
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Labels</h1>
              </div>
            </div>
            <LabelsManager />
          </div>
        );
      case "customization":
        return (
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Personnalisation</h1>
              </div>
            </div>
            <CustomizationManager />
          </div>
        );
      case "parametres":
        return (
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Paramètres</h1>
              </div>
            </div>
            <ParametersManager />
          </div>
        );
      case "etablissement":
        return (
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Établissement</h1>
              </div>
            </div>
            <EstablishmentManager />
          </div>
        );
      case "team":
        return (
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Équipe</h1>
              </div>
            </div>
            <TeamManager />
          </div>
        );
      case "supplements":
        return (
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Suppléments</h1>
              </div>
            </div>
            <SupplementsManager />
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