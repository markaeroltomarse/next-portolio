import AnimateOnScroll from "@components/Displays/AnimateOnScroll";
import Badge from "@components/Displays/Badge";
import Section from "@components/Displays/Section";
import SectionHeading from "@components/Displays/SectionHeading";
import { ProjectsData, ProjectItem } from "@common_types/cms.types";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

interface ProjectsSectionProps {
  data: ProjectsData;
}

const ProjectCard: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const hasLink = project.liveUrl || project.repoUrl;
  const url = project.liveUrl || project.repoUrl;

  const content = (
    <div className="group rounded-lg border border-border bg-card overflow-hidden transition-all duration-200 hover:border-accent/50 hover:shadow-md">
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg">{project.name}</h3>
          {hasLink && (
            <FiExternalLink
              size={16}
              className="text-muted-foreground mt-1 flex-shrink-0"
            />
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (hasLink && url) {
    return (
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data }) => {
  const sorted = [...data.items].sort((a, b) => a.order - b.order);

  return (
    <Section id="projects">
      <AnimateOnScroll>
        <SectionHeading title={data.heading} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </AnimateOnScroll>
    </Section>
  );
};

export default ProjectsSection;
