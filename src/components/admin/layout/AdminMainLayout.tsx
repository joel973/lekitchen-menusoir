import { cn } from "@/lib/utils";
import { AdminSidebar } from "./AdminSidebar";
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
        <div className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
          <div className="container flex h-14 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Store className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <AdminSidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="flex flex-col">
          <main className={cn("flex-1", className)}>
            {children}
          </main>
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
        <main className={cn("flex-1 p-4 md:p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}