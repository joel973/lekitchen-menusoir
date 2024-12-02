import {
  Store,
  Tag,
  UtensilsCrossed,
  AlertTriangle,
  Settings,
  ListCheck,
  Filter,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserProfileDisplay } from "../UserProfileDisplay";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

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
    title: "Établissement",
    icon: Store,
    tab: "etablissement",
  },
  {
    title: "Paramètres",
    icon: Settings,
    tab: "parametres",
  },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");
  const isMobile = useIsMobile();

  const handleNavigation = (tab: string) => {
    navigate(`/equipe?tab=${tab}`, { replace: true });
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full md:hidden">
        <SidebarTrigger className="m-4" />
      </div>

      <Sidebar variant={isMobile ? "floating" : "sidebar"}>
        <SidebarHeader className="border-b p-6">
          <span className="font-display text-lg font-bold">Administration</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleNavigation(item.tab)}
                      isActive={currentTab === item.tab}
                      tooltip={item.title}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <UserProfileDisplay />
      </Sidebar>
    </>
  );
}