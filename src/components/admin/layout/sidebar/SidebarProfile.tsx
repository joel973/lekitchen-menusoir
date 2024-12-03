import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface SidebarProfileProps {
  profile: Profile | null;
  isCollapsed: boolean;
  isMobile: boolean;
  onLogout: () => void;
  onProfileClick: () => void;
}

export function SidebarProfile({ profile, isCollapsed, isMobile, onLogout, onProfileClick }: SidebarProfileProps) {
  return (
    <div className="mt-auto p-4">
      <Card>
        <CardContent className={cn(
          "p-4",
          isCollapsed && !isMobile && "p-2"
        )}>
          {(!isCollapsed || isMobile) ? (
            <>
              <div 
                className="flex items-center gap-4 cursor-pointer"
                onClick={onProfileClick}
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
                onClick={onLogout}
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
                    onClick={onLogout}
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
  );
}