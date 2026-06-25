import useAdminData from "@hooks/use-admin-data.hook";
import { TestimonialsData } from "@common_types/cms.types";
import AdminLayout from "@features/admin/layouts/admin-layout";
import AdminCard from "@features/admin/components/admin-card";
import AdminInput from "@features/admin/components/admin-input";
import AdminTextarea from "@features/admin/components/admin-textarea";
import AdminImageUpload from "@features/admin/components/admin-image-upload";
import AdminSaveButton from "@features/admin/components/admin-save-button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export default function AdminTestimonials() {
  const { data, setData, loading, saving, saved, save } =
    useAdminData<TestimonialsData>("testimonials");

  if (loading || !data) {
    return (
      <AdminLayout title="Testimonials">
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...data.items];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, items: updated });
  };

  const addItem = () =>
    setData({
      ...data,
      items: [
        ...data.items,
        {
          id: `testimonial-${Date.now()}`,
          name: "",
          role: "",
          company: "",
          content: "",
          avatar: "",
        },
      ],
    });

  const removeItem = (index: number) =>
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });

  return (
    <AdminLayout title="Testimonials">
      <div className="max-w-2xl space-y-6">
        <AdminCard>
          <div className="space-y-4">
            <AdminInput
              label="Section Heading"
              value={data.heading}
              onChange={(v) => setData({ ...data, heading: v })}
            />
            <AdminInput
              label="Subtitle"
              value={data.subtitle}
              onChange={(v) => setData({ ...data, subtitle: v })}
            />
          </div>
        </AdminCard>

        {data.items.map((item, i) => (
          <AdminCard key={item.id}>
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-medium text-gray-900">
                {item.name || "New Testimonial"}
              </h4>
              <button
                onClick={() => removeItem(i)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <AdminTextarea
                label="Testimonial"
                value={item.content}
                onChange={(v) => updateItem(i, "content", v)}
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <AdminInput
                  label="Name"
                  value={item.name}
                  onChange={(v) => updateItem(i, "name", v)}
                />
                <AdminInput
                  label="Role"
                  value={item.role}
                  onChange={(v) => updateItem(i, "role", v)}
                />
              </div>
              <AdminInput
                label="Company"
                value={item.company}
                onChange={(v) => updateItem(i, "company", v)}
              />
              <AdminImageUpload
                label="Avatar"
                value={item.avatar}
                subfolder="testimonials"
                onUpload={(path) => updateItem(i, "avatar", path)}
              />
            </div>
          </AdminCard>
        ))}

        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <FiPlus size={16} /> Add Testimonial
        </button>

        <div>
          <AdminSaveButton
            onClick={() => save(data)}
            loading={saving}
            saved={saved}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
