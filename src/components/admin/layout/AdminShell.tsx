import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div className="flex flex-col">
          <AdminHeader />
          <ScrollArea className="flex-1">
            <main className="flex-1">{children}</main>
          </ScrollArea>
        </div>
      </div>
    </SidebarProvider>
  );
}