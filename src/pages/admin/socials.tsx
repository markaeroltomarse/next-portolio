import useAdminData from "@hooks/use-admin-data.hook";
import { SocialsData } from "@common_types/cms.types";
import AdminLayout from "@features/admin/layouts/admin-layout";
import AdminCard from "@features/admin/components/admin-card";
import AdminInput from "@features/admin/components/admin-input";
import AdminSaveButton from "@features/admin/components/admin-save-button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const ICON_OPTIONS = [
  "FiGithub",
  "FiLinkedin",
  "FiTwitter",
  "FiYoutube",
  "FiMail",
  "FiMessageCircle",
  "FiGlobe",
  "FiExternalLink",
];

export default function AdminSocials() {
  const { data, setData, loading, saving, saved, save } =
    useAdminData<SocialsData>("socials");

  if (loading || !data) {
    return (
      <AdminLayout title="Socials">
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  const updateSocial = (index: number, field: string, value: string) => {
    const updated = [...data.items];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, items: updated });
  };

  const addSocial = () =>
    setData({
      ...data,
      items: [
        ...data.items,
        { id: `social-${Date.now()}`, platform: "", url: "", icon: "FiGlobe" },
      ],
    });

  const removeSocial = (index: number) =>
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });

  return (
    <AdminLayout title="Socials">
      <div className="max-w-2xl space-y-6">
        {data.items.map((social, i) => (
          <AdminCard key={social.id}>
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-medium text-gray-900">
                {social.platform || "Untitled"}
              </h4>
              <button
                onClick={() => removeSocial(i)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <AdminInput
                label="Platform"
                value={social.platform}
                onChange={(v) => updateSocial(i, "platform", v)}
                placeholder="GitHub"
              />
              <AdminInput
                label="URL"
                value={social.url}
                onChange={(v) => updateSocial(i, "url", v)}
                placeholder="https://..."
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <select
                  value={social.icon}
                  onChange={(e) => updateSocial(i, "icon", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </AdminCard>
        ))}

        <button
          onClick={addSocial}
          className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <FiPlus size={16} /> Add Social Link
        </button>

        <div>
          <AdminSaveButton onClick={() => save(data)} loading={saving} saved={saved} />
        </div>
      </div>
    </AdminLayout>
  );
}
