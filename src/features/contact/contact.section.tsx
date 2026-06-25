import AnimateOnScroll from "@components/Displays/AnimateOnScroll";
import DynamicIcon from "@components/Displays/DynamicIcon";
import Section from "@components/Displays/Section";
import SectionHeading from "@components/Displays/SectionHeading";
import IconButton from "@components/Inputs/IconButton";
import { SocialsData } from "@common_types/cms.types";
import { FiMail } from "react-icons/fi";

interface ContactSectionProps {
  socials: SocialsData;
  email: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ socials, email }) => (
  <Section id="contact">
    <AnimateOnScroll>
      <div className="text-center max-w-xl mx-auto">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind or want to collaborate? Feel free to reach out."
        />
        <div className="flex justify-center mb-8">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <FiMail size={20} />
            {email}
          </a>
        </div>
        <div className="flex justify-center gap-3">
          {socials.items
            .filter((s) => s.url)
            .map((social) => (
              <IconButton
                key={social.id}
                href={social.url}
                icon={<DynamicIcon name={social.icon} size={18} />}
                ariaLabel={social.platform}
              />
            ))}
        </div>
      </div>
    </AnimateOnScroll>
  </Section>
);

export default ContactSection;
