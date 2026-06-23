import AdminLayout from "@features/admin/layouts/admin-layout";
import Link from "next/link";
import {
  FiLayout,
  FiUser,
  FiCode,
  FiFolder,
  FiBriefcase,
  FiShare2,
  FiSettings,
} from "react-icons/fi";

const sections = [
  { href: "/admin/hero", label: "Hero", desc: "Name, title, profile image", icon: FiLayout },
  { href: "/admin/about", label: "About", desc: "Bio and paragraphs", icon: FiUser },
  { href: "/admin/skills", label: "Skills", desc: "Technologies and categories", icon: FiCode },
  { href: "/admin/projects", label: "Projects", desc: "Portfolio projects", icon: FiFolder },
  { href: "/admin/experience", label: "Experience", desc: "Work history and education", icon: FiBriefcase },
  { href: "/admin/socials", label: "Socials", desc: "Social media links", icon: FiShare2 },
  { href: "/admin/settings", label: "Settings", desc: "Site name, nav links, theme", icon: FiSettings },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 hover:shadow-sm transition-all"
            >
              <Icon size={24} className="text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900">{section.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{section.desc}</p>
            </Link>
          );
        })}
      </div>
    </AdminLayout>
  );
}
