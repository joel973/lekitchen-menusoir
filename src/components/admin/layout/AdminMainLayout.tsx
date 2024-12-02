import { cn } from "@/lib/utils";
import { AdminSidebar } from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminMainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminMainLayout({ children, className }: AdminMainLayoutProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen w-full bg-surface">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border shadow-sm"
            >
              <Store className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <AdminSidebar />
          </SheetContent>
        </Sheet>
        <div className="flex flex-col animate-fade-in pt-16">
          <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
            <main className={cn("flex-1 p-4", className)}>
              {children}
            </main>
          </ScrollArea>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-surface">
      <div className="hidden border-r bg-card lg:block">
        <AdminSidebar />
      </div>
      <div className="flex flex-col animate-fade-in">
        <ScrollArea className="flex-1 h-screen">
          <main className={cn("flex-1 p-4 md:p-6", className)}>{children}</main>
        </ScrollArea>
      </div>
    </div>
  );
}