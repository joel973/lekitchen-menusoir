import { AdminPageLayout } from "@/components/admin/shared/AdminPageLayout";
import { SupplementsManager } from "@/components/admin/SupplementsManager";

export default function Supplements() {
  return (
    <AdminPageLayout
      title="Suppléments"
      description="Gérez les suppléments disponibles pour vos articles"
    >
      <SupplementsManager />
    </AdminPageLayout>
  );
}