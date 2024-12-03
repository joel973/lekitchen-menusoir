import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Store, Tag, UtensilsCrossed, AlertTriangle, Settings, ListCheck, Filter, Users, Plus } from "lucide-react";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarMenu } from "./sidebar/SidebarMenu";
import { SidebarProfile } from "./sidebar/SidebarProfile";

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

export function AdminSidebar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;
      
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      
      return data;
    },
  });

  const handleNavigation = (tab: string) => {
    navigate(`/equipe?tab=${tab}`, { replace: true });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <SidebarHeader 
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <SidebarMenu 
        items={menuItems}
        currentTab={currentTab}
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        onNavigate={handleNavigation}
      />
      <SidebarProfile 
        profile={profile}
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        onLogout={handleLogout}
        onProfileClick={() => navigate("/profile")}
      />
    </div>
  );
}