import useAdminAuth from "@hooks/use-admin-auth.hook";
import Link from "next/link";
import { useRouter } from "next/router";
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-bold text-lg text-gray-900">Admin Panel</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
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
      </aside>

      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
