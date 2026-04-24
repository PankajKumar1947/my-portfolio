import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { HashnodeBlogCard } from "@/components/common/hashnode-blog-card";
import { getHashnodePosts } from "@/services/hashnode.service";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `My Blog | ${siteConfig.name}`,
  description: "Read my latest articles and thoughts on web development.",
};

export default async function BlogPage() {
  const posts = await getHashnodePosts();

  return (
    <>
      <PageHeader
        title="My Blog"
        subtitle="Insights and tutorials on modern web development, sharing my journey and learnings."
        gradient
      />

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {posts.map((post, index) => (
              <HashnodeBlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground">No blog posts found from Hashnode.</p>
            <p className="text-sm text-muted-foreground/60">
              Check if the Hashnode host is correctly configured.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
