import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { LogsTable } from "@/components/admin/logs/LogsTable";

export default function Logs() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Logs du système</h1>
        <LogsTable />
      </div>
    </AdminLayout>
  );
}