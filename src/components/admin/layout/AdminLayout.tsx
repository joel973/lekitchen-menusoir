import { AuthGuard } from "./AuthGuard";
import { AdminShell } from "./AdminShell";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AdminShell>{children}</AdminShell>
    </AuthGuard>
  );
}