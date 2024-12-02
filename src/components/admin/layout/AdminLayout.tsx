import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AuthGuard } from "./AuthGuard";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-surface">
          <AdminSidebar />
          <main className="flex-1 overflow-auto">
            <div className="container max-w-7xl py-8 space-y-8 px-6 md:px-8">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}