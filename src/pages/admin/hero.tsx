import useAdminData from "@hooks/use-admin-data.hook";
import { HeroData } from "@common_types/cms.types";
import AdminLayout from "@features/admin/layouts/admin-layout";
import AdminCard from "@features/admin/components/admin-card";
import AdminInput from "@features/admin/components/admin-input";
import AdminImageUpload from "@features/admin/components/admin-image-upload";
import AdminSaveButton from "@features/admin/components/admin-save-button";

export default function AdminHero() {
  const { data, setData, loading, saving, saved, save } =
    useAdminData<HeroData>("hero");

  if (loading || !data) {
    return (
      <AdminLayout title="Hero">
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  const update = (field: keyof HeroData, value: string) =>
    setData({ ...data, [field]: value });

  return (
    <AdminLayout title="Hero">
      <div className="max-w-2xl space-y-6">
        <AdminCard title="Profile">
          <div className="space-y-4">
            <AdminImageUpload
              label="Profile Image"
              value={data.profileImage}
              subfolder="profile"
              onUpload={(path) => update("profileImage", path)}
            />
            <AdminInput
              label="Name"
              value={data.name}
              onChange={(v) => update("name", v)}
            />
            <AdminInput
              label="Title"
              value={data.title}
              onChange={(v) => update("title", v)}
            />
            <AdminInput
              label="Subtitle"
              value={data.subtitle}
              onChange={(v) => update("subtitle", v)}
            />
          </div>
        </AdminCard>

        <AdminCard title="Resume">
          <div className="space-y-4">
            <AdminInput
              label="Resume URL"
              value={data.resumeUrl}
              onChange={(v) => update("resumeUrl", v)}
              placeholder="/uploads/documents/cv.pdf"
            />
            <AdminInput
              label="Resume Button Label"
              value={data.resumeLabel}
              onChange={(v) => update("resumeLabel", v)}
            />
          </div>
        </AdminCard>

        <AdminSaveButton onClick={() => save(data)} loading={saving} saved={saved} />
      </div>
    </AdminLayout>
  );
}
