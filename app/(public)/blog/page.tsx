import { PageHeader } from "@/components/common/page-header";
import { BlogCard } from "@/components/common/blog-card";
import { blogPosts } from "@/lib/mock-data";

export default function BlogPage() {
  const publishedPosts = blogPosts.filter((p) => p.published);

  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="Thoughts, tutorials, and insights on web development."
        gradient
      />

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
