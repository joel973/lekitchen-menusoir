import { ProfileForm } from "@/components/profile/ProfileForm";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

export default function Profile() {
  return (
    <AdminLayout>
      <div className="space-y-6 bg-white rounded-lg shadow-md m-8">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">Mon profil</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos informations personnelles
          </p>
        </div>
        <div className="p-6">
          <ProfileForm />
        </div>
      </div>
    </AdminLayout>
  );
}