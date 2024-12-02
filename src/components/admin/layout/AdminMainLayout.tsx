import { cn } from "@/lib/utils";
import { AdminSidebar } from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminMainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminMainLayout({ children, className }: AdminMainLayoutProps) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <ScrollArea className="flex-1">
          <main className={cn("flex-1", className)}>{children}</main>
        </ScrollArea>
      </div>
    </div>
  );
}