import useAdminData from "@hooks/use-admin-data.hook";
import { ExperienceData, ExperienceItem, EducationItem } from "@common_types/cms.types";
import AdminLayout from "@features/admin/layouts/admin-layout";
import AdminCard from "@features/admin/components/admin-card";
import AdminInput from "@features/admin/components/admin-input";
import AdminTextarea from "@features/admin/components/admin-textarea";
import AdminSaveButton from "@features/admin/components/admin-save-button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

function emptyExperience(): ExperienceItem {
  return {
    id: `exp-${Date.now()}`,
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    tags: [],
  };
}

function emptyEducation(): EducationItem {
  return { id: `edu-${Date.now()}`, school: "", degree: "", year: "" };
}

export default function AdminExperience() {
  const { data, setData, loading, saving, saved, save } =
    useAdminData<ExperienceData>("experience");

  if (loading || !data) {
    return (
      <AdminLayout title="Experience">
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  const updateExp = (index: number, field: keyof ExperienceItem, value: unknown) => {
    const updated = [...data.items];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, items: updated });
  };

  const updateEdu = (index: number, field: keyof EducationItem, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, education: updated });
  };

  return (
    <AdminLayout title="Experience">
      <div className="max-w-2xl space-y-6">
        <AdminCard>
          <AdminInput
            label="Section Heading"
            value={data.heading}
            onChange={(v) => setData({ ...data, heading: v })}
          />
        </AdminCard>

        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>

        {data.items.map((exp, i) => (
          <AdminCard key={exp.id}>
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-medium text-gray-900">
                {exp.role || "Untitled"} {exp.company && `at ${exp.company}`}
              </h4>
              <button
                onClick={() =>
                  setData({ ...data, items: data.items.filter((_, idx) => idx !== i) })
                }
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <AdminInput
                  label="Company"
                  value={exp.company}
                  onChange={(v) => updateExp(i, "company", v)}
                />
                <AdminInput
                  label="Role"
                  value={exp.role}
                  onChange={(v) => updateExp(i, "role", v)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <AdminInput
                  label="Start Date (YYYY-MM)"
                  value={exp.startDate}
                  onChange={(v) => updateExp(i, "startDate", v)}
                  placeholder="2022-01"
                />
                <AdminInput
                  label="End Date (YYYY-MM)"
                  value={exp.endDate}
                  onChange={(v) => updateExp(i, "endDate", v)}
                  placeholder="2023-01"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExp(i, "current", e.target.checked)}
                  className="rounded border-gray-300"
                />
                Currently working here
              </label>
              <AdminTextarea
                label="Description"
                value={exp.description}
                onChange={(v) => updateExp(i, "description", v)}
              />
              <AdminInput
                label="Tags (comma-separated)"
                value={exp.tags.join(", ")}
                onChange={(v) =>
                  updateExp(
                    i,
                    "tags",
                    v.split(",").map((t) => t.trim()).filter(Boolean)
                  )
                }
              />
            </div>
          </AdminCard>
        ))}

        <button
          onClick={() =>
            setData({ ...data, items: [...data.items, emptyExperience()] })
          }
          className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <FiPlus size={16} /> Add Experience
        </button>

        <h3 className="text-lg font-semibold text-gray-900 pt-4">Education</h3>

        {data.education.map((edu, i) => (
          <AdminCard key={edu.id}>
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-medium text-gray-900">
                {edu.school || "Untitled"}
              </h4>
              <button
                onClick={() =>
                  setData({
                    ...data,
                    education: data.education.filter((_, idx) => idx !== i),
                  })
                }
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <AdminInput
                label="School"
                value={edu.school}
                onChange={(v) => updateEdu(i, "school", v)}
              />
              <AdminInput
                label="Degree"
                value={edu.degree}
                onChange={(v) => updateEdu(i, "degree", v)}
              />
              <AdminInput
                label="Year"
                value={edu.year}
                onChange={(v) => updateEdu(i, "year", v)}
              />
            </div>
          </AdminCard>
        ))}

        <button
          onClick={() =>
            setData({ ...data, education: [...data.education, emptyEducation()] })
          }
          className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <FiPlus size={16} /> Add Education
        </button>

        <div>
          <AdminSaveButton onClick={() => save(data)} loading={saving} saved={saved} />
        </div>
      </div>
    </AdminLayout>
  );
}
