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
  const description = post.excerpt || `Read "${post.title}" by ${profile.name}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${profile.name}`,
      description,
      type: "article",
      publishedTime: post.createdAt?.toISOString(),
      authors: [profile.name],
      ...(post.coverImg && {
        images: [
          {
            url: post.coverImg,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.coverImg && { images: [post.coverImg] }),
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
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
    datePublished: post.createdAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    ...(post.coverImg && { image: post.coverImg }),
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
