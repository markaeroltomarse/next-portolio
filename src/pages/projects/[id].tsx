import Badge from "@components/Displays/Badge";
import Container from "@components/Displays/Container";
import Navbar from "@components/Displays/Navbar";
import Footer from "@components/Displays/Footer";
import {
  ProjectItem,
  ProjectsData,
  SettingsData,
  SocialsData,
} from "@common_types/cms.types";
import { readJsonFileSync } from "@lib/api-helpers";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";

interface ProjectPageProps {
  project: ProjectItem;
  settings: SettingsData;
  socials: SocialsData;
}

export default function ProjectPage({
  project,
  settings,
  socials,
}: ProjectPageProps) {
  return (
    <>
      <Head>
        <title>{`${project.name} | ${settings.siteName}`}</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.name} />
        <meta property="og:description" content={project.description} />
        <meta
          property="og:image"
          content={`${settings.siteUrl}${project.image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar settings={settings} />
      <main className="pt-24 pb-20">
        <Container>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <FiArrowLeft size={14} />
            Back to Projects
          </Link>

          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-8">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold">{project.name}</h1>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <FiExternalLink size={14} />
                  Live Demo
                </Link>
              )}
              {project.repoUrl && (
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <FiGithub size={14} />
                  Source Code
                </Link>
              )}
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.challenges && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">
                    Challenges & Solutions
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}
            </div>

            {project.screenshots.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.screenshots.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-video rounded-lg overflow-hidden bg-muted"
                    >
                      <Image
                        src={src}
                        alt={`${project.name} screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer socials={socials} settings={settings} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async ({
  params,
}) => {
  const projects = readJsonFileSync<ProjectsData>("projects");
  const settings = readJsonFileSync<SettingsData>("settings");
  const socials = readJsonFileSync<SocialsData>("socials");
  const project = projects.items.find((p) => p.id === params?.id);

  if (!project) {
    return { notFound: true };
  }

  return { props: { project, settings, socials } };
};
