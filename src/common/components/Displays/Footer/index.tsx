import Container from "@components/Displays/Container";
import DynamicIcon from "@components/Displays/DynamicIcon";
import { SocialsData, SettingsData } from "@common_types/cms.types";
import Link from "next/link";

interface FooterProps {
  socials: SocialsData;
  settings: SettingsData;
}

const Footer: React.FC<FooterProps> = ({ socials, settings }) => (
  <footer className="border-t border-border py-12">
    <Container className="flex flex-col items-center gap-6">
      <div className="flex gap-4">
        {socials.items
          .filter((s) => s.url)
          .map((social) => (
            <Link
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <DynamicIcon name={social.icon} size={20} />
            </Link>
          ))}
      </div>
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {settings.footerText}. All rights
        reserved.
      </p>
    </Container>
  </footer>
);

export default Footer;
