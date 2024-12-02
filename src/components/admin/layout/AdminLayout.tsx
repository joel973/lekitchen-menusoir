import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AuthGuard } from "./AuthGuard";
import { useIsMobile } from "@/hooks/use-mobile";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-surface">
          <AdminSidebar />
          <main className={`flex-1 overflow-auto ${isMobile ? "pt-16" : ""}`}>
            {children}
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}