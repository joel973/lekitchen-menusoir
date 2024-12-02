import { ProfileForm } from "@/components/profile/ProfileForm";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { AdminPageLayout } from "@/components/admin/shared/AdminPageLayout";

export default function Profile() {
  return (
    <AdminLayout>
      <AdminPageLayout
        title="Mon profil"
        description="Gérez vos informations personnelles"
      >
        <ProfileForm />
      </AdminPageLayout>
    </AdminLayout>
  );
}