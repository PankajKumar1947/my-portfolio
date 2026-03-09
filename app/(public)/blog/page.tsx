"use client";

import { PageHeader } from "@/components/common/page-header";
import { BlogCard } from "@/components/common/blog-card";
import { useBlogs } from "@/hooks/query/use-blog";
import { Loader2 } from "lucide-react";

export default function BlogPage() {
  const { data: blogs, isLoading, error } = useBlogs();

  const publishedPosts = blogs?.filter((p) => p.status === "published") || [];

  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="Thoughts, tutorials, and insights on web development."
        gradient
      />

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center text-destructive">
            <p>Failed to load blog posts. Please try again later.</p>
          </div>
        ) : publishedPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedPosts.map((post) => (
              <BlogCard key={post._id.toString()} post={post} />
            ))}
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
