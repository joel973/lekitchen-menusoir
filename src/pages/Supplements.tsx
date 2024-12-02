import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { SupplementsManager } from "@/components/admin/SupplementsManager";

export default function Supplements() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Suppléments</h1>
        <SupplementsManager />
      </div>
    </AdminLayout>
  );
}