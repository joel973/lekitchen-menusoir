import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { SupplementsManager } from "@/components/admin/SupplementsManager";

export default function Supplements() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Suppléments</h1>
          </div>
        </div>
        <SupplementsManager />
      </div>
    </AdminLayout>
  );
}