import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { BlogCard } from "@/components/common/blog-card";
import { connectDB } from "@/lib/db";
import { getPublishedBlogsService } from "@/services/blog.service";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.blog.title,
  description: siteConfig.blog.description,
  openGraph: {
    title: siteConfig.blog.title,
    description: siteConfig.blog.description,
  },
};

export default async function BlogPage() {
  await connectDB();
  const publishedPosts = await getPublishedBlogsService();

  return (
    <>
      <PageHeader
        title={siteConfig.blog.title}
        subtitle={siteConfig.blog.description}
        gradient
      />

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        {publishedPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedPosts.map((post: any, index: number) => {
              // Convert Mongoose/Date objects to plain strings/objects for Client Components
              const serializedPost = {
                ...post,
                _id: post._id.toString(),
                createdAt: post.createdAt?.toISOString(),
                updatedAt: post.updatedAt?.toISOString(),
              };
              return (
                <BlogCard
                  key={serializedPost._id}
                  post={serializedPost}
                  index={index}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            <p>No blog posts found.</p>
          </div>
        )}
      </div>
    </>
  );
}
