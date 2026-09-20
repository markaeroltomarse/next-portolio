import Container from "@components/Displays/Container";
import DynamicIcon from "@components/Displays/DynamicIcon";
import { SocialsData, SettingsData } from "@common_types/cms.types";
import Link from "next/link";

interface FooterProps {
  socials: SocialsData;
  settings: SettingsData;
}

const Footer: React.FC<FooterProps> = ({ socials, settings }) => (
  <footer className="border-t border-border/60 py-14">
    <Container className="flex flex-col items-center gap-6">
      <div className="flex gap-3">
        {socials.items
          .filter((s) => s.url)
          .map((social) => (
            <Link
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground/[0.04] text-muted-foreground hover:text-foreground hover:bg-foreground/[0.08] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <DynamicIcon name={social.icon} size={18} />
            </Link>
          ))}
      </div>
      <p className="text-[13px] text-muted-foreground">
        &copy; {new Date().getFullYear()} {settings.footerText}. All rights
        reserved.
      </p>
    </Container>
  </footer>
);

export default Footer;
