import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AuthGuard } from "./AuthGuard";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <AdminSidebar />
          <div className="flex flex-col">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}