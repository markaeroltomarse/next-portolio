import ThemeToggle from "@components/Inputs/ThemeToggle";
import { NavLink, SettingsData } from "@common_types/cms.types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { HiCode } from "react-icons/hi";

interface NavbarProps {
  settings: SettingsData;
  resumeUrl?: string;
}

const Navbar: React.FC<NavbarProps> = ({ settings, resumeUrl }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <div className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6">
      <nav className="glass mx-auto max-w-6xl rounded-[26px] shadow-ios">
        <div className="flex items-center justify-between h-14 px-4 sm:px-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-[15px] tracking-tight rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <HiCode className="text-accent" size={22} />
            {settings.siteName}
          </Link>

          <div className="hidden md:flex items-center gap-1 rounded-full bg-foreground/[0.04] px-1.5 py-1.5">
            {settings.navLinks.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {resumeUrl && (
              <Link
                href={resumeUrl}
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-full bg-foreground/[0.05] text-foreground hover:bg-foreground/[0.09] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <FiDownload size={13} />
                CV
              </Link>
            )}
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-foreground/[0.05] text-foreground hover:bg-foreground/[0.09] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-foreground/[0.08] px-4 py-3 flex flex-col gap-1">
            {settings.navLinks.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-medium text-muted-foreground hover:text-foreground rounded-xl px-3 py-2.5 hover:bg-foreground/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </Link>
            ))}
            {resumeUrl && (
              <Link
                href={resumeUrl}
                target="_blank"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-muted-foreground hover:text-foreground rounded-xl px-3 py-2.5 hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <FiDownload size={14} />
                Download CV
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
