import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { SupplementsManager } from "@/components/admin/SupplementsManager";

export default function Supplements() {
  return (
    <AdminLayout>
      <SupplementsManager />
    </AdminLayout>
  );
}