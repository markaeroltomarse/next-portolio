import useAdminAuth from "@hooks/use-admin-auth.hook";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiBriefcase,
  FiShare2,
  FiSettings,
  FiExternalLink,
  FiLogOut,
  FiLayout,
  FiMenu,
  FiX,
} from "react-icons/fi";

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/hero", label: "Hero", icon: FiLayout },
  { href: "/admin/about", label: "About", icon: FiUser },
  { href: "/admin/skills", label: "Skills", icon: FiCode },
  { href: "/admin/projects", label: "Projects", icon: FiFolder },
  { href: "/admin/experience", label: "Experience", icon: FiBriefcase },
  { href: "/admin/socials", label: "Socials", icon: FiShare2 },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const sidebar = (
    <>
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h1 className="font-bold text-lg text-gray-900">Admin Panel</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
        >
          <FiExternalLink size={16} />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 w-full"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      <div className="lg:ml-64">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 lg:py-6 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <FiMenu size={20} />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
