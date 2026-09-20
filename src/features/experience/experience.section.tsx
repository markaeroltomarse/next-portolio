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
  <Section id="experience" muted>
    <AnimateOnScroll>
      <SectionHeading title={data.heading} />

      <div className="space-y-8 max-w-2xl">
        {data.items.map((item) => (
          <div key={item.id} className="border-l-[1.5px] border-border pl-6 relative">
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/15" />
            <div className="flex items-center gap-2">
              <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">
                {formatDateRange(item.startDate, item.endDate, item.current)}
              </p>
              {item.current && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent/15 text-accent">
                  Present
                </span>
              )}
            </div>
            <h3 className="mt-1 text-[17px] font-semibold tracking-tight">
              {item.role}{" "}
              <span className="text-muted-foreground font-normal">
                at {item.company}
              </span>
            </h3>
            <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
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
          <h3 className="text-[20px] font-semibold tracking-tight mb-6">Education</h3>
          <div className="space-y-6 max-w-2xl">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-[1.5px] border-border pl-6 relative">
                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-muted-foreground/60" />
                <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">
                  {edu.year}
                </p>
                <h4 className="mt-1 font-semibold tracking-tight">{edu.school}</h4>
                <p className="text-[14px] text-muted-foreground">{edu.degree}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </AnimateOnScroll>
  </Section>
);

export default ExperienceSection;
