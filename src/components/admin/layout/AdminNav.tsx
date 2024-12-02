import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Store,
  Tag,
  UtensilsCrossed,
  AlertTriangle,
  Settings,
  ListCheck,
  Filter,
  Users,
  Plus,
} from "lucide-react";

const menuItems = [
  {
    title: "Rush",
    icon: Filter,
    tab: "rush",
  },
  {
    title: "Articles",
    icon: UtensilsCrossed,
    tab: "articles",
  },
  {
    title: "Catégories",
    icon: Tag,
    tab: "categories",
  },
  {
    title: "Allergènes",
    icon: AlertTriangle,
    tab: "allergenes",
  },
  {
    title: "Labels",
    icon: ListCheck,
    tab: "labels",
  },
  {
    title: "Suppléments",
    icon: Plus,
    tab: "supplements",
  },
  {
    title: "Établissement",
    icon: Store,
    tab: "etablissement",
  },
  {
    title: "Équipe",
    icon: Users,
    tab: "team",
  },
  {
    title: "Paramètres",
    icon: Settings,
    tab: "parametres",
  },
];

export function AdminNav() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
    <nav className="grid items-start gap-2 p-4">
      {menuItems.map((item) => (
        <Button
          key={item.tab}
          variant="ghost"
          onClick={() => navigate(`/equipe?tab=${item.tab}`)}
          className={cn(
            "w-full justify-start gap-2",
            currentTab === item.tab && "bg-secondary"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Button>
      ))}
    </nav>
  );
}