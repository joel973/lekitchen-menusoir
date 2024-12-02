import { cn } from "@/lib/utils";
import { AdminSidebar } from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminMainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminMainLayout({ children, className }: AdminMainLayoutProps) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-surface">
      <AdminSidebar />
      <div className="flex flex-col animate-fade-in">
        <ScrollArea className="flex-1 h-screen">
          <main className={cn("flex-1 p-4 md:p-6", className)}>{children}</main>
        </ScrollArea>
      </div>
    </div>
  );
}