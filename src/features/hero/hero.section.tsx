import AnimateOnScroll from "@components/Displays/AnimateOnScroll";
import DynamicIcon from "@components/Displays/DynamicIcon";
import LottiePlayer from "@components/Displays/LottiePlayer";
import Section from "@components/Displays/Section";
import IconButton from "@components/Inputs/IconButton";
import { HeroData, SocialsData } from "@common_types/cms.types";
import heroOrbit from "@assets/lottie/hero-orbit.json";
import Image from "next/image";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";

interface HeroSectionProps {
  data: HeroData;
  socials: SocialsData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data, socials }) => (
  <Section id="hero" className="min-h-[calc(100vh-6rem)] flex items-center py-20 md:py-20">
    <AnimateOnScroll className="w-full">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-14 md:gap-20">
        <div className="flex flex-col gap-7 text-center md:text-left">
          <div>
            <p className="inline-block text-accent font-semibold text-[13px] mb-3 tracking-tight bg-accent/10 rounded-full px-3 py-1">
              {data.title}
            </p>
            <h1 className="text-[44px] md:text-[68px] font-bold tracking-[-0.03em] leading-[1.05]">
              {data.name}
            </h1>
            <p className="mt-5 text-[17px] text-muted-foreground max-w-lg leading-relaxed">
              {data.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
            {data.resumeUrl && (
              <Link
                href={data.resumeUrl}
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold text-[15px] shadow-ios hover:opacity-90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <FiDownload size={16} />
                {data.resumeLabel}
              </Link>
            )}

            <div className="flex gap-3">
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
        </div>

        <div className="relative w-48 h-48 md:w-72 md:h-72 flex-shrink-0">
          <div
            className="pointer-events-none absolute inset-0 -z-10 scale-[1.3]"
            aria-hidden="true"
          >
            <LottiePlayer animationData={heroOrbit} />
          </div>
          <Image
            src={data.profileImage}
            alt={`${data.name} - ${data.title}`}
            fill
            sizes="(max-width: 768px) 192px, 288px"
            className="object-cover rounded-[38px] md:rounded-[56px] ring-1 ring-border shadow-ios-lg"
            priority
          />
        </div>
      </div>
    </AnimateOnScroll>
  </Section>
);

export default HeroSection;
