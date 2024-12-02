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
          <div className="space-y-6 bg-white rounded-lg shadow-md m-8">
            <div className="p-6 border-b">
              <div>
                <h1 className="text-2xl font-bold">Articles</h1>
                <p className="text-muted-foreground mt-1">
                  Gérez votre catalogue d'articles
                </p>
              </div>
            </div>
            <div className="p-6">
              <ArticlesManager />
            </div>
          </div>
        );
      case "categories":
        return (
          <div className="space-y-6 bg-white rounded-lg shadow-md m-8">
            <div className="p-6 border-b">
              <div>
                <h1 className="text-2xl font-bold">Catégories</h1>
                <p className="text-muted-foreground mt-1">
                  Gérez vos catégories d'articles
                </p>
              </div>
            </div>
            <div className="p-6">
              <CategoriesManager />
            </div>
          </div>
        );
      case "allergenes":
        return (
          <div className="space-y-6 bg-white rounded-lg shadow-md m-8">
            <div className="p-6 border-b">
              <div>
                <h1 className="text-2xl font-bold">Allergènes</h1>
                <p className="text-muted-foreground mt-1">
                  Gérez la liste des allergènes
                </p>
              </div>
            </div>
            <div className="p-6">
              <AllergenesManager />
            </div>
          </div>
        );
      case "labels":
        return (
          <div className="space-y-6 bg-white rounded-lg shadow-md m-8">
            <div className="p-6 border-b">
              <div>
                <h1 className="text-2xl font-bold">Labels</h1>
                <p className="text-muted-foreground mt-1">
                  Gérez les labels de vos articles
                </p>
              </div>
            </div>
            <div className="p-6">
              <LabelsManager />
            </div>
          </div>
        );
      case "customization":
        return (
          <div className="space-y-6 bg-white rounded-lg shadow-md m-8">
            <div className="p-6 border-b">
              <div>
                <h1 className="text-2xl font-bold">Personnalisation</h1>
                <p className="text-muted-foreground mt-1">
                  Personnalisez l'apparence de votre site
                </p>
              </div>
            </div>
            <div className="p-6">
              <CustomizationManager />
            </div>
          </div>
        );
      case "parametres":
        return (
          <div className="space-y-6 bg-white rounded-lg shadow-md m-8">
            <div className="p-6 border-b">
              <div>
                <h1 className="text-2xl font-bold">Paramètres</h1>
                <p className="text-muted-foreground mt-1">
                  Configurez les paramètres de votre application
                </p>
              </div>
            </div>
            <div className="p-6">
              <ParametersManager />
            </div>
          </div>
        );
      case "etablissement":
        return (
          <div className="space-y-6 bg-white rounded-lg shadow-md m-8">
            <div className="p-6 border-b">
              <div>
                <h1 className="text-2xl font-bold">Établissement</h1>
                <p className="text-muted-foreground mt-1">
                  Gérez les informations de votre établissement
                </p>
              </div>
            </div>
            <div className="p-6">
              <EstablishmentManager />
            </div>
          </div>
        );
      case "team":
        return (
          <div className="space-y-6 bg-white rounded-lg shadow-md m-8">
            <div className="p-6 border-b">
              <div>
                <h1 className="text-2xl font-bold">Équipe</h1>
                <p className="text-muted-foreground mt-1">
                  Gérez les membres de votre équipe
                </p>
              </div>
            </div>
            <div className="p-6">
              <TeamManager />
            </div>
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