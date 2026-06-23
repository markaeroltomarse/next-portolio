import useAdminData from "@hooks/use-admin-data.hook";
import { AboutData } from "@common_types/cms.types";
import AdminLayout from "@features/admin/layouts/admin-layout";
import AdminCard from "@features/admin/components/admin-card";
import AdminInput from "@features/admin/components/admin-input";
import AdminTextarea from "@features/admin/components/admin-textarea";
import AdminImageUpload from "@features/admin/components/admin-image-upload";
import AdminSaveButton from "@features/admin/components/admin-save-button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export default function AdminAbout() {
  const { data, setData, loading, saving, saved, save } =
    useAdminData<AboutData>("about");

  if (loading || !data) {
    return (
      <AdminLayout title="About">
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  const updateParagraph = (index: number, value: string) => {
    const updated = [...data.paragraphs];
    updated[index] = value;
    setData({ ...data, paragraphs: updated });
  };

  const addParagraph = () =>
    setData({ ...data, paragraphs: [...data.paragraphs, ""] });

  const removeParagraph = (index: number) =>
    setData({ ...data, paragraphs: data.paragraphs.filter((_, i) => i !== index) });

  return (
    <AdminLayout title="About">
      <div className="max-w-2xl space-y-6">
        <AdminCard title="About Section">
          <div className="space-y-4">
            <AdminInput
              label="Heading"
              value={data.heading}
              onChange={(v) => setData({ ...data, heading: v })}
            />
            <AdminImageUpload
              label="Profile Image"
              value={data.profileImage}
              subfolder="profile"
              onUpload={(path) => setData({ ...data, profileImage: path })}
            />
            <AdminTextarea
              label="Bio (short intro)"
              value={data.bio}
              onChange={(v) => setData({ ...data, bio: v })}
              rows={3}
            />
          </div>
        </AdminCard>

        <AdminCard title="Paragraphs">
          <div className="space-y-4">
            {data.paragraphs.map((p, i) => (
              <div key={i} className="flex gap-2">
                <div className="flex-1">
                  <AdminTextarea
                    label={`Paragraph ${i + 1}`}
                    value={p}
                    onChange={(v) => updateParagraph(i, v)}
                  />
                </div>
                <button
                  onClick={() => removeParagraph(i)}
                  className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={addParagraph}
              className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
            >
              <FiPlus size={14} /> Add Paragraph
            </button>
          </div>
        </AdminCard>

        <AdminSaveButton onClick={() => save(data)} loading={saving} saved={saved} />
      </div>
    </AdminLayout>
  );
}
