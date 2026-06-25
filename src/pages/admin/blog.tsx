import useAdminData from "@hooks/use-admin-data.hook";
import { BlogData, BlogPost } from "@common_types/cms.types";
import AdminLayout from "@features/admin/layouts/admin-layout";
import AdminCard from "@features/admin/components/admin-card";
import AdminInput from "@features/admin/components/admin-input";
import AdminTextarea from "@features/admin/components/admin-textarea";
import AdminImageUpload from "@features/admin/components/admin-image-upload";
import AdminSaveButton from "@features/admin/components/admin-save-button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

function emptyPost(): BlogPost {
  return {
    id: `post-${Date.now()}`,
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: [],
    publishedAt: new Date().toISOString().split("T")[0],
    published: false,
  };
}

export default function AdminBlog() {
  const { data, setData, loading, saving, saved, save } =
    useAdminData<BlogData>("blog");

  if (loading || !data) {
    return (
      <AdminLayout title="Blog">
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  const updatePost = (index: number, field: keyof BlogPost, value: unknown) => {
    const updated = [...data.items];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "title" && !updated[index].slug) {
      updated[index].slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }
    setData({ ...data, items: updated });
  };

  const addPost = () =>
    setData({ ...data, items: [...data.items, emptyPost()] });

  const removePost = (index: number) =>
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });

  return (
    <AdminLayout title="Blog">
      <div className="max-w-2xl space-y-6">
        <AdminCard>
          <AdminInput
            label="Section Heading"
            value={data.heading}
            onChange={(v) => setData({ ...data, heading: v })}
          />
        </AdminCard>

        {data.items.map((post, i) => (
          <AdminCard key={post.id}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-medium text-gray-900">
                  {post.title || "Untitled Post"}
                </h4>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    post.published
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <button
                onClick={() => removePost(i)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <AdminInput
                label="Title"
                value={post.title}
                onChange={(v) => updatePost(i, "title", v)}
              />
              <AdminInput
                label="Slug (URL path)"
                value={post.slug}
                onChange={(v) => updatePost(i, "slug", v)}
                placeholder="my-blog-post"
              />
              <AdminTextarea
                label="Excerpt (short preview)"
                value={post.excerpt}
                onChange={(v) => updatePost(i, "excerpt", v)}
                rows={2}
              />
              <AdminTextarea
                label="Content (separate paragraphs with blank lines)"
                value={post.content}
                onChange={(v) => updatePost(i, "content", v)}
                rows={10}
              />
              <AdminImageUpload
                label="Cover Image"
                value={post.coverImage}
                subfolder="blog"
                onUpload={(path) => updatePost(i, "coverImage", path)}
              />
              <AdminInput
                label="Tags (comma-separated)"
                value={post.tags.join(", ")}
                onChange={(v) =>
                  updatePost(
                    i,
                    "tags",
                    v
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  )
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <AdminInput
                  label="Published Date"
                  value={post.publishedAt}
                  onChange={(v) => updatePost(i, "publishedAt", v)}
                  type="date"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <label className="flex items-center gap-2 text-sm mt-2">
                    <input
                      type="checkbox"
                      checked={post.published}
                      onChange={(e) =>
                        updatePost(i, "published", e.target.checked)
                      }
                      className="rounded border-gray-300"
                    />
                    Published
                  </label>
                </div>
              </div>
            </div>
          </AdminCard>
        ))}

        <button
          onClick={addPost}
          className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <FiPlus size={16} /> Add Blog Post
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
