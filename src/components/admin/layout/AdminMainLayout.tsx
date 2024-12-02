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
  console.log("AdminMainLayout rendering");

  if (isMobile) {
    return (
      <>
        <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-sm">
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
        </nav>
        {children}
      </>
    );
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r glass-sidebar lg:block">
        <AdminSidebar />
      </aside>
      {children}
    </div>
  );
}