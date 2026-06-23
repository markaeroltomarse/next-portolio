import useAdminData from "@hooks/use-admin-data.hook";
import { SkillsData, SkillCategory, SkillItem } from "@common_types/cms.types";
import AdminLayout from "@features/admin/layouts/admin-layout";
import AdminCard from "@features/admin/components/admin-card";
import AdminInput from "@features/admin/components/admin-input";
import AdminSaveButton from "@features/admin/components/admin-save-button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export default function AdminSkills() {
  const { data, setData, loading, saving, saved, save } =
    useAdminData<SkillsData>("skills");

  if (loading || !data) {
    return (
      <AdminLayout title="Skills">
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  const updateCategory = (index: number, field: keyof SkillCategory, value: string) => {
    const updated = [...data.categories];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, categories: updated });
  };

  const updateSkillItem = (catIndex: number, itemIndex: number, field: keyof SkillItem, value: string) => {
    const updated = [...data.categories];
    const items = [...updated[catIndex].items];
    items[itemIndex] = { ...items[itemIndex], [field]: value };
    updated[catIndex] = { ...updated[catIndex], items };
    setData({ ...data, categories: updated });
  };

  const addCategory = () =>
    setData({
      ...data,
      categories: [
        ...data.categories,
        { id: `cat-${Date.now()}`, name: "", items: [] },
      ],
    });

  const removeCategory = (index: number) =>
    setData({ ...data, categories: data.categories.filter((_, i) => i !== index) });

  const addSkillItem = (catIndex: number) => {
    const updated = [...data.categories];
    updated[catIndex] = {
      ...updated[catIndex],
      items: [
        ...updated[catIndex].items,
        { id: `skill-${Date.now()}`, name: "", icon: "SiReact" },
      ],
    };
    setData({ ...data, categories: updated });
  };

  const removeSkillItem = (catIndex: number, itemIndex: number) => {
    const updated = [...data.categories];
    updated[catIndex] = {
      ...updated[catIndex],
      items: updated[catIndex].items.filter((_, i) => i !== itemIndex),
    };
    setData({ ...data, categories: updated });
  };

  return (
    <AdminLayout title="Skills">
      <div className="max-w-2xl space-y-6">
        <AdminCard>
          <AdminInput
            label="Section Heading"
            value={data.heading}
            onChange={(v) => setData({ ...data, heading: v })}
          />
        </AdminCard>

        {data.categories.map((cat, ci) => (
          <AdminCard key={cat.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <AdminInput
                  label="Category Name"
                  value={cat.name}
                  onChange={(v) => updateCategory(ci, "name", v)}
                />
              </div>
              <button
                onClick={() => removeCategory(ci)}
                className="mt-6 ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <FiTrash2 size={16} />
              </button>
            </div>

            <div className="space-y-3 ml-4">
              {cat.items.map((item, ii) => (
                <div key={item.id} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <AdminInput
                      label="Skill Name"
                      value={item.name}
                      onChange={(v) => updateSkillItem(ci, ii, "name", v)}
                    />
                  </div>
                  <div className="flex-1">
                    <AdminInput
                      label="Icon (e.g. SiReact)"
                      value={item.icon}
                      onChange={(v) => updateSkillItem(ci, ii, "icon", v)}
                    />
                  </div>
                  <button
                    onClick={() => removeSkillItem(ci, ii)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg mb-0.5"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSkillItem(ci)}
                className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
              >
                <FiPlus size={14} /> Add Skill
              </button>
            </div>
          </AdminCard>
        ))}

        <button
          onClick={addCategory}
          className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <FiPlus size={16} /> Add Category
        </button>

        <div>
          <AdminSaveButton onClick={() => save(data)} loading={saving} saved={saved} />
        </div>
      </div>
    </AdminLayout>
  );
}
