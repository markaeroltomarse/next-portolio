import AnimateOnScroll from "@components/Displays/AnimateOnScroll";
import DynamicIcon from "@components/Displays/DynamicIcon";
import Section from "@components/Displays/Section";
import IconButton from "@components/Inputs/IconButton";
import { HeroData, SocialsData } from "@common_types/cms.types";
import Image from "next/image";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";

interface HeroSectionProps {
  data: HeroData;
  socials: SocialsData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data, socials }) => (
  <Section id="hero" className="min-h-[calc(100vh-4rem)] flex items-center py-0 md:py-0">
    <div className="max-w-5xl mx-auto px-6 w-full">
      <AnimateOnScroll>
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div>
              <p className="text-accent font-medium mb-2">{data.title}</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {data.name}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                {data.subtitle}
              </p>
            </div>

            <div className="flex gap-3 justify-center md:justify-start">
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

            {data.resumeUrl && (
              <div className="flex justify-center md:justify-start">
                <Link
                  href={data.resumeUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  <FiDownload size={16} />
                  {data.resumeLabel}
                </Link>
              </div>
            )}
          </div>

          <div className="relative w-48 h-48 md:w-72 md:h-72 flex-shrink-0">
            <Image
              src={data.profileImage}
              alt={`${data.name} - ${data.title}`}
              fill
              sizes="(max-width: 768px) 192px, 288px"
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  </Section>
);

export default HeroSection;
