import {
  Store,
  Tag,
  UtensilsCrossed,
  AlertTriangle,
  Settings,
  ListCheck,
  Filter,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
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
      <div className="fixed top-0 left-0 z-50 w-full border-b bg-white md:hidden">
        <div className="flex h-16 items-center px-6">
          <SidebarTrigger />
          <span className="ml-4 font-display text-lg text-content">
            Administration
          </span>
        </div>
      </div>

      <Sidebar variant={isMobile ? "floating" : "sidebar"} className="bg-white">
        <SidebarHeader className="p-8">
          <span className="font-display text-lg text-content">
            Administration
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 text-xs font-medium uppercase tracking-wider text-content-tertiary/70">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleNavigation(item.tab)}
                      isActive={currentTab === item.tab}
                      tooltip={item.title}
                      className="transition-all duration-200 hover:bg-hover/50"
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
        <div className="mx-6 mb-6 rounded-xl">
          <UserProfileDisplay />
        </div>
      </Sidebar>
    </>
  );
}