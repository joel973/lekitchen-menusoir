import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AuthGuard } from "./AuthGuard";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <main className="flex-1 overflow-auto bg-gray-50">
            <div className="mx-auto max-w-7xl p-6">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}