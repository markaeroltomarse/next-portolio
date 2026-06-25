import Footer from "@components/Displays/Footer";
import Navbar from "@components/Displays/Navbar";
import {
  AboutData,
  ExperienceData,
  HeroData,
  ProjectsData,
  SettingsData,
  SkillsData,
  SocialsData,
  TestimonialsData,
} from "@common_types/cms.types";
import AboutSection from "@features/about/about.section";
import ContactSection from "@features/contact/contact.section";
import ExperienceSection from "@features/experience/experience.section";
import TestimonialsSection from "@features/testimonials/testimonials.section";
import HeroSection from "@features/hero/hero.section";
import ProjectsSection from "@features/projects/projects.section";
import SkillsSection from "@features/skills/skills.section";
import { readJsonFileSync } from "@lib/api-helpers";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface HomeProps {
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  projects: ProjectsData;
  experience: ExperienceData;
  testimonials: TestimonialsData;
  socials: SocialsData;
  settings: SettingsData;
}

export default function Home({
  hero,
  about,
  skills,
  projects,
  experience,
  testimonials,
  socials,
  settings,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>{settings.siteTitle}</title>
        <meta name="description" content={settings.siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={settings.siteTitle} />
        <meta property="og:description" content={settings.siteDescription} />
        <meta property="og:image" content={`${settings.siteUrl}${hero.profileImage}`} />
        <meta property="og:url" content={settings.siteUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={settings.siteTitle} />
        <meta name="twitter:description" content={settings.siteDescription} />
        <meta name="twitter:image" content={`${settings.siteUrl}${hero.profileImage}`} />
      </Head>
      <Navbar settings={settings} resumeUrl={hero.resumeUrl} />
      <main className="pt-16">
        <HeroSection data={hero} socials={socials} />
        <AboutSection data={about} />
        <SkillsSection data={skills} />
        <ProjectsSection data={projects} />
        <ExperienceSection data={experience} />
        <TestimonialsSection data={testimonials} />
        <ContactSection socials={socials} email="marktomarse@gmail.com" />
      </main>
      <Footer socials={socials} settings={settings} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return {
    props: {
      hero: readJsonFileSync<HeroData>("hero"),
      about: readJsonFileSync<AboutData>("about"),
      skills: readJsonFileSync<SkillsData>("skills"),
      projects: readJsonFileSync<ProjectsData>("projects"),
      experience: readJsonFileSync<ExperienceData>("experience"),
      testimonials: readJsonFileSync<TestimonialsData>("testimonials"),
      socials: readJsonFileSync<SocialsData>("socials"),
      settings: readJsonFileSync<SettingsData>("settings"),
    },
  };
};
