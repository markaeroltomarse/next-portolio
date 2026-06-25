import Badge from "@components/Displays/Badge";
import Container from "@components/Displays/Container";
import Footer from "@components/Displays/Footer";
import Navbar from "@components/Displays/Navbar";
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
import { FiArrowLeft, FiCalendar } from "react-icons/fi";

interface BlogPostPageProps {
  post: BlogPost;
  settings: SettingsData;
  socials: SocialsData;
}

export default function BlogPostPage({
  post,
  settings,
  socials,
}: BlogPostPageProps) {
  return (
    <>
      <Head>
        <title>{`${post.title} | ${settings.siteName}`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.coverImage && (
          <meta
            property="og:image"
            content={`${settings.siteUrl}${post.coverImage}`}
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar settings={settings} />
      <main className="pt-24 pb-20">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <FiArrowLeft size={14} />
            Back to Blog
          </Link>

          {post.coverImage && (
            <div className="relative aspect-[2.5/1] rounded-lg overflow-hidden bg-muted mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <article className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <FiCalendar size={14} />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-10 prose prose-lg dark:prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </Container>
      </main>
      <Footer socials={socials} settings={settings} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<BlogPostPageProps> = async ({
  params,
}) => {
  const blog = readJsonFileSync<BlogData>("blog");
  const settings = readJsonFileSync<SettingsData>("settings");
  const socials = readJsonFileSync<SocialsData>("socials");
  const post = blog.items.find(
    (p) => p.slug === params?.slug && p.published
  );

  if (!post) {
    return { notFound: true };
  }

  return { props: { post, settings, socials } };
};
