import Container from "@components/Displays/Container";
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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <HiCode className="text-accent" size={24} />
          {settings.siteName}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {settings.navLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {resumeUrl && (
            <Link
              href={resumeUrl}
              target="_blank"
              className="hidden md:inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
            >
              <FiDownload size={14} />
              CV
            </Link>
          )}
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-muted-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <Container className="py-4 flex flex-col gap-3">
            {settings.navLinks.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {resumeUrl && (
              <Link
                href={resumeUrl}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2"
              >
                <FiDownload size={14} />
                Download CV
              </Link>
            )}
          </Container>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
