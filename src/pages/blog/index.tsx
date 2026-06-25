import Badge from "@components/Displays/Badge";
import Container from "@components/Displays/Container";
import Footer from "@components/Displays/Footer";
import Navbar from "@components/Displays/Navbar";
import AnimateOnScroll from "@components/Displays/AnimateOnScroll";
import {
  BlogData,
  BlogPost,
  SettingsData,
  SocialsData,
} from "@common_types/cms.types";
import { readJsonFileSync } from "@lib/api-helpers";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

interface BlogPageProps {
  blog: BlogData;
  settings: SettingsData;
  socials: SocialsData;
}

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <Link href={`/blog/${post.slug}`}>
    <div className="group rounded-lg border border-border bg-card overflow-hidden transition-all duration-200 hover:border-accent/50 hover:shadow-md">
      {post.coverImage && (
        <div className="relative aspect-[2/1] bg-muted overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <FiCalendar size={12} />
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg">{post.title}</h3>
          <FiArrowRight
            size={16}
            className="text-muted-foreground mt-1 flex-shrink-0 group-hover:text-accent transition-colors"
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  </Link>
);

export default function BlogPage({ blog, settings, socials }: BlogPageProps) {
  const published = blog.items.filter((p) => p.published);

  return (
    <>
      <Head>
        <title>{`Blog | ${settings.siteName}`}</title>
        <meta
          name="description"
          content={`Technical blog by ${settings.footerText}`}
        />
      </Head>
      <Navbar settings={settings} />
      <main className="pt-24 pb-20 min-h-screen">
        <Container>
          <AnimateOnScroll>
            <h1 className="text-3xl font-bold mb-2">{blog.heading}</h1>
            <p className="text-muted-foreground mb-10">
              Thoughts on software development, technology, and building
              products.
            </p>

            {published.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No posts yet. Stay tuned!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {published.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </AnimateOnScroll>
        </Container>
      </main>
      <Footer socials={socials} settings={settings} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async () => {
  return {
    props: {
      blog: readJsonFileSync<BlogData>("blog"),
      settings: readJsonFileSync<SettingsData>("settings"),
      socials: readJsonFileSync<SocialsData>("socials"),
    },
  };
};
