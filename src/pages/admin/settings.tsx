import useAdminData from "@hooks/use-admin-data.hook";
import { SettingsData } from "@common_types/cms.types";
import AdminLayout from "@features/admin/layouts/admin-layout";
import AdminCard from "@features/admin/components/admin-card";
import AdminInput from "@features/admin/components/admin-input";
import AdminSelect from "@features/admin/components/admin-select";
import AdminSaveButton from "@features/admin/components/admin-save-button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export default function AdminSettings() {
  const { data, setData, loading, saving, saved, save } =
    useAdminData<SettingsData>("settings");

  if (loading || !data) {
    return (
      <AdminLayout title="Settings">
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  const updateNavLink = (index: number, field: string, value: string) => {
    const updated = [...data.navLinks];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, navLinks: updated });
  };

  const addNavLink = () =>
    setData({ ...data, navLinks: [...data.navLinks, { label: "", href: "" }] });

  const removeNavLink = (index: number) =>
    setData({ ...data, navLinks: data.navLinks.filter((_, i) => i !== index) });

  return (
    <AdminLayout title="Settings">
      <div className="max-w-2xl space-y-6">
        <AdminCard title="General">
          <div className="space-y-4">
            <AdminInput
              label="Site Name"
              value={data.siteName}
              onChange={(v) => setData({ ...data, siteName: v })}
            />
            <AdminInput
              label="Site Title"
              value={data.siteTitle}
              onChange={(v) => setData({ ...data, siteTitle: v })}
            />
            <AdminInput
              label="Site Description"
              value={data.siteDescription}
              onChange={(v) => setData({ ...data, siteDescription: v })}
            />
            <AdminInput
              label="Footer Text"
              value={data.footerText}
              onChange={(v) => setData({ ...data, footerText: v })}
            />
            <AdminSelect
              label="Default Theme"
              value={data.defaultTheme}
              onChange={(v) =>
                setData({ ...data, defaultTheme: v as "light" | "dark" })
              }
              options={[
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" },
              ]}
            />
          </div>
        </AdminCard>

        <AdminCard title="Navigation Links">
          <div className="space-y-3">
            {data.navLinks.map((link, i) => (
              <div key={i} className="flex gap-2 items-end">
                <div className="flex-1">
                  <AdminInput
                    label="Label"
                    value={link.label}
                    onChange={(v) => updateNavLink(i, "label", v)}
                  />
                </div>
                <div className="flex-1">
                  <AdminInput
                    label="Href"
                    value={link.href}
                    onChange={(v) => updateNavLink(i, "href", v)}
                    placeholder="#section"
                  />
                </div>
                <button
                  onClick={() => removeNavLink(i)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg mb-0.5"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={addNavLink}
              className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
            >
              <FiPlus size={14} /> Add Link
            </button>
          </div>
        </AdminCard>

        <AdminSaveButton onClick={() => save(data)} loading={saving} saved={saved} />
      </div>
    </AdminLayout>
  );
}
