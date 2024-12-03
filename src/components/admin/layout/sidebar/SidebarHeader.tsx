import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  isMobile: boolean;
  onToggle: () => void;
}

export function SidebarHeader({ isCollapsed, isMobile, onToggle }: SidebarHeaderProps) {
  return (
    <div className="relative">
      <div className={cn(
        "flex h-[60px] items-center border-b px-6",
        isCollapsed ? "justify-center px-2" : "justify-between"
      )}>
        {!isCollapsed && <h2 className="font-semibold">Administration</h2>}
      </div>
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="absolute -right-4 top-[14px] h-8 w-8 translate-x-0 rounded-full border bg-background"
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform duration-200",
            isCollapsed && "rotate-180"
          )} />
        </Button>
      )}
    </div>
  );
}