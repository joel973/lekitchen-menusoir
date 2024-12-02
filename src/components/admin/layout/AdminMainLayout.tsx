import { cn } from "@/lib/utils";
import { AdminSidebar } from "./AdminSidebar";
import { Menu } from "lucide-react";
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
      <div className="min-h-screen">
        <div className="sticky top-0 z-50 w-full border-b backdrop-blur-sm">
          <div className="flex h-14 items-center px-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <AdminSidebar />
              </SheetContent>
            </Sheet>
            <h2 className="font-semibold">Administration</h2>
          </div>
        </div>
        <main className={cn("flex-1", className)}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card lg:block">
        <AdminSidebar />
      </div>
      <main className={cn("flex-1", className)}>
        {children}
      </main>
    </div>
  );
}