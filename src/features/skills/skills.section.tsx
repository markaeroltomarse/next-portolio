import AnimateOnScroll from "@components/Displays/AnimateOnScroll";
import DynamicIcon from "@components/Displays/DynamicIcon";
import Section from "@components/Displays/Section";
import SectionHeading from "@components/Displays/SectionHeading";
import { SkillsData, SkillCategory } from "@common_types/cms.types";

interface SkillsSectionProps {
  data: SkillsData;
}

const CategoryGroup: React.FC<{ category: SkillCategory }> = ({ category }) => (
  <div>
    <h3 className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground mb-4">
      {category.name}
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {category.items.map((skill) => (
        <div
          key={skill.id}
          className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3.5 shadow-ios transition-all duration-300 hover:border-accent/40 hover:shadow-ios-lg hover:-translate-y-0.5"
        >
          <DynamicIcon name={skill.icon} size={20} className="text-accent" />
          <span className="text-[14px] font-medium">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection: React.FC<SkillsSectionProps> = ({ data }) => (
  <Section id="skills" muted>
    <AnimateOnScroll>
      <SectionHeading title={data.heading} />
      <div className="space-y-8">
        {data.categories.map((category) => (
          <CategoryGroup key={category.id} category={category} />
        ))}
      </div>
    </AnimateOnScroll>
  </Section>
);

export default SkillsSection;
