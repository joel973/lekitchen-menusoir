import {
  Store,
  Tag,
  UtensilsCrossed,
  AlertTriangle,
  Palette,
  Settings,
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
} from "@/components/ui/sidebar";
import { UserProfileDisplay } from "../UserProfileDisplay";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Articles",
    icon: UtensilsCrossed,
    path: "/articles",
  },
  {
    title: "Catégories",
    icon: Tag,
    path: "/categories",
  },
  {
    title: "Allergènes",
    icon: AlertTriangle,
    path: "/allergenes",
  },
  {
    title: "Établissement",
    icon: Store,
    path: "/etablissement",
  },
  {
    title: "Personnalisation",
    icon: Palette,
    path: "/personnalisation",
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/parametres",
  },
];

export function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="border-b px-6 py-3">
        <h2 className="font-display text-lg font-bold">Administration</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <UserProfileDisplay />
    </Sidebar>
  );
}