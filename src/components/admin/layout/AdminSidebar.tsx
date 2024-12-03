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
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      <div className={cn(
        "flex h-[60px] items-center border-b px-6",
        isCollapsed ? "justify-center px-2" : "justify-between"
      )}>
        {!isCollapsed && <h2 className="font-semibold">Administration</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform duration-200",
            isCollapsed && "rotate-180"
          )} />
        </Button>
      </div>
      <div className="flex-1 px-4">
        <TooltipProvider delayDuration={0}>
          <nav className="grid items-start gap-2">
            {menuItems.map((item) => (
              <Tooltip key={item.tab}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation(item.tab)}
                    className={cn(
                      "w-full justify-start gap-2",
                      currentTab === item.tab && "bg-secondary",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && item.title}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </div>
      <div className="mt-auto p-4">
        <Card>
          <CardContent className={cn(
            "p-4",
            isCollapsed && "p-2"
          )}>
            {!isCollapsed ? (
              <>
                <div 
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <div className="font-medium">
                    {profile?.first_name} {profile?.last_name}
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    {profile?.role === "admin" ? "Admin" : "Membre"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  className="mt-4 w-full justify-start gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Se déconnecter
                </Button>
              </>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Se déconnecter
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}