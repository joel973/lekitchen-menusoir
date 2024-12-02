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

const menuItems = [
  {
    title: "Articles",
    icon: UtensilsCrossed,
    href: "#articles",
  },
  {
    title: "Catégories",
    icon: Tag,
    href: "#categories",
  },
  {
    title: "Allergènes",
    icon: AlertTriangle,
    href: "#allergenes",
  },
  {
    title: "Établissement",
    icon: Store,
    href: "#etablissement",
  },
  {
    title: "Personnalisation",
    icon: Palette,
    href: "#personnalisation",
  },
  {
    title: "Paramètres",
    icon: Settings,
    href: "#parametres",
  },
];

export function AdminSidebar() {
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
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.href} 
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-gray-500" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </a>
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