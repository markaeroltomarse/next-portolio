import AnimateOnScroll from "@components/Displays/AnimateOnScroll";
import Section from "@components/Displays/Section";
import SectionHeading from "@components/Displays/SectionHeading";
import { AboutData } from "@common_types/cms.types";

interface AboutSectionProps {
  data: AboutData;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => (
  <Section id="about">
    <AnimateOnScroll>
      <SectionHeading title={data.heading} />
      <div className="max-w-2xl space-y-6">
        <p className="text-lg leading-relaxed text-muted-foreground">
          {data.bio}
        </p>
        {data.paragraphs.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </AnimateOnScroll>
  </Section>
);

export default AboutSection;
