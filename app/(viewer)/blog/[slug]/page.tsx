import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogViewer } from "./_components/blog-viewer";
import { connectDB } from "@/lib/db";
import { getBlogBySlugService } from "@/services/blog.service";
import { siteConfig } from "@/config/site";
import { profile } from "@/config/profile";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const post = await getBlogBySlugService(slug);

  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  const title = post.title;
  const description = `Read "${post.title}" by ${profile.name}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${profile.name}`,
      description,
      type: "article",
      publishedTime: post.createdAt?.toISOString(),
      authors: [profile.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  await connectDB();
  const post = await getBlogBySlugService(slug);

  if (!post) {
    notFound();
  }

  const serializedPost = JSON.parse(JSON.stringify(post));

  // BlogPosting JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
    datePublished: post.createdAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    url: `${siteConfig.url}/blog/${slug}`,
    publisher: {
      "@type": "Person",
      name: profile.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogViewer post={serializedPost} />
    </>
  );
}
