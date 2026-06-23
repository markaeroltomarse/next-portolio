import useAdminData from "@hooks/use-admin-data.hook";
import { ProjectsData, ProjectItem } from "@common_types/cms.types";
import AdminLayout from "@features/admin/layouts/admin-layout";
import AdminCard from "@features/admin/components/admin-card";
import AdminInput from "@features/admin/components/admin-input";
import AdminTextarea from "@features/admin/components/admin-textarea";
import AdminImageUpload from "@features/admin/components/admin-image-upload";
import AdminSaveButton from "@features/admin/components/admin-save-button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

function emptyProject(): ProjectItem {
  return {
    id: `proj-${Date.now()}`,
    name: "",
    description: "",
    image: "",
    liveUrl: "",
    repoUrl: "",
    tags: [],
    featured: false,
    order: 999,
  };
}

export default function AdminProjects() {
  const { data, setData, loading, saving, saved, save } =
    useAdminData<ProjectsData>("projects");

  if (loading || !data) {
    return (
      <AdminLayout title="Projects">
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  const updateProject = (index: number, field: keyof ProjectItem, value: unknown) => {
    const updated = [...data.items];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, items: updated });
  };

  const addProject = () =>
    setData({ ...data, items: [...data.items, emptyProject()] });

  const removeProject = (index: number) =>
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });

  return (
    <AdminLayout title="Projects">
      <div className="max-w-2xl space-y-6">
        <AdminCard>
          <AdminInput
            label="Section Heading"
            value={data.heading}
            onChange={(v) => setData({ ...data, heading: v })}
          />
        </AdminCard>

        {data.items.map((project, i) => (
          <AdminCard key={project.id}>
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-medium text-gray-900">
                {project.name || "Untitled Project"}
              </h4>
              <button
                onClick={() => removeProject(i)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <FiTrash2 size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <AdminInput
                label="Name"
                value={project.name}
                onChange={(v) => updateProject(i, "name", v)}
              />
              <AdminTextarea
                label="Description"
                value={project.description}
                onChange={(v) => updateProject(i, "description", v)}
                rows={2}
              />
              <AdminImageUpload
                label="Image"
                value={project.image}
                subfolder="projects"
                onUpload={(path) => updateProject(i, "image", path)}
              />
              <div className="grid grid-cols-2 gap-4">
                <AdminInput
                  label="Live URL"
                  value={project.liveUrl}
                  onChange={(v) => updateProject(i, "liveUrl", v)}
                  placeholder="https://..."
                />
                <AdminInput
                  label="Repo URL"
                  value={project.repoUrl}
                  onChange={(v) => updateProject(i, "repoUrl", v)}
                  placeholder="https://github.com/..."
                />
              </div>
              <AdminInput
                label="Tags (comma-separated)"
                value={project.tags.join(", ")}
                onChange={(v) =>
                  updateProject(
                    i,
                    "tags",
                    v.split(",").map((t) => t.trim()).filter(Boolean)
                  )
                }
              />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={project.featured}
                    onChange={(e) =>
                      updateProject(i, "featured", e.target.checked)
                    }
                    className="rounded border-gray-300"
                  />
                  Featured
                </label>
                <div className="w-24">
                  <AdminInput
                    label="Order"
                    value={String(project.order)}
                    onChange={(v) => updateProject(i, "order", Number(v) || 0)}
                    type="number"
                  />
                </div>
              </div>
            </div>
          </AdminCard>
        ))}

        <button
          onClick={addProject}
          className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <FiPlus size={16} /> Add Project
        </button>

        <div>
          <AdminSaveButton onClick={() => save(data)} loading={saving} saved={saved} />
        </div>
      </div>
    </AdminLayout>
  );
}
