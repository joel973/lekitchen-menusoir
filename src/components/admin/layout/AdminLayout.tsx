import { AuthGuard } from "./AuthGuard";
import { AdminMainLayout } from "./AdminMainLayout";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}