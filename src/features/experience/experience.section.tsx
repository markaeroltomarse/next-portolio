import AnimateOnScroll from "@components/Displays/AnimateOnScroll";
import Badge from "@components/Displays/Badge";
import Section from "@components/Displays/Section";
import SectionHeading from "@components/Displays/SectionHeading";
import { ExperienceData } from "@common_types/cms.types";

interface ExperienceSectionProps {
  data: ExperienceData;
}

function formatDateRange(start: string, end: string, current: boolean): string {
  const fmt = (d: string) => {
    const [year, month] = d.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  return `${fmt(start)} — ${current ? "Present" : fmt(end)}`;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data }) => (
  <Section id="experience">
    <AnimateOnScroll>
      <SectionHeading title={data.heading} />

      <div className="space-y-8 max-w-2xl">
        {data.items.map((item) => (
          <div key={item.id} className="border-l-2 border-border pl-6 relative">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {formatDateRange(item.startDate, item.endDate, item.current)}
            </p>
            <h3 className="mt-1 text-lg font-semibold">
              {item.role}{" "}
              <span className="text-muted-foreground font-normal">
                at {item.company}
              </span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
            {item.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="accent">{tag}</Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {data.education.length > 0 && (
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6">Education</h3>
          <div className="space-y-6 max-w-2xl">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-border pl-6 relative">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {edu.year}
                </p>
                <h4 className="mt-1 font-semibold">{edu.school}</h4>
                <p className="text-sm text-muted-foreground">{edu.degree}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </AnimateOnScroll>
  </Section>
);

export default ExperienceSection;
