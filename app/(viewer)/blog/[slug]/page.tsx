import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HashnodeBlogViewer } from "./_components/hashnode-blog-viewer";
import { getHashnodePost } from "@/services/hashnode.service";
import { siteConfig } from "@/config/site";
import { profile } from "@/config/profile";

interface HashnodeBlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: HashnodeBlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getHashnodePost(slug);

  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  const title = post.title;
  const description = post.brief;

  return {
    title: `${title} | Hashnode Blog`,
    description,
    openGraph: {
      title: `${title} | ${profile.name}`,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [profile.name],
      images: post.coverImage?.url ? [post.coverImage.url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage?.url ? [post.coverImage.url] : [],
    },
  };
}

export default async function HashnodeBlogDetailPage({
  params,
}: HashnodeBlogDetailPageProps) {
  const { slug } = await params;
  const post = await getHashnodePost(slug);

  if (!post) {
    notFound();
  }

  return <HashnodeBlogViewer post={post} />;
}
