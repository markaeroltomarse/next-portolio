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
    <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
      {category.name}
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {category.items.map((skill) => (
        <div
          key={skill.id}
          className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-accent/50"
        >
          <DynamicIcon name={skill.icon} size={20} className="text-muted-foreground" />
          <span className="text-sm font-medium">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection: React.FC<SkillsSectionProps> = ({ data }) => (
  <Section id="skills">
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
