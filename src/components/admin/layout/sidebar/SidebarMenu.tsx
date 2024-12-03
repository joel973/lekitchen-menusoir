import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MenuItem {
  title: string;
  icon: LucideIcon;
  tab: string;
}

interface SidebarMenuProps {
  items: MenuItem[];
  currentTab: string | null;
  isCollapsed: boolean;
  isMobile: boolean;
  onNavigate: (tab: string) => void;
}

export function SidebarMenu({ items, currentTab, isCollapsed, isMobile, onNavigate }: SidebarMenuProps) {
  return (
    <div className="flex-1 px-4">
      <TooltipProvider delayDuration={0}>
        <nav className="grid items-start gap-2">
          {items.map((item) => (
            <Tooltip key={item.tab}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate(item.tab)}
                  className={cn(
                    "w-full justify-start gap-2",
                    currentTab === item.tab && "bg-secondary",
                    isCollapsed && !isMobile && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {(!isCollapsed || isMobile) && item.title}
                </Button>
              </TooltipTrigger>
              {isCollapsed && !isMobile && (
                <TooltipContent side="right">
                  {item.title}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </div>
  );
}