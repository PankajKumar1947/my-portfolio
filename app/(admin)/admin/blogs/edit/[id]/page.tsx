"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import { Loader } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { useUpdateBlog } from "@/hooks/mutation/use-blog";
import { useBlogById } from "@/hooks/query/use-blog";

export default function BlogEditPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { data: blog, isLoading, error } = useBlogById(id);
  const [content, setContent] = React.useState("");

  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog(id);

  React.useEffect(() => {
    if (blog) {
      setContent(blog.content || "");
    }
  }, [blog]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col h-64 items-center justify-center gap-4">
        <p className="text-destructive">Failed to load blog post.</p>
        <Button variant="outline" onClick={() => router.push("/admin/blogs")}>
          Back to Blogs
        </Button>
      </div>
    );
  }

  const handleSave = () => {
    updateBlog({ ...blog, content } as any, {
      onSuccess: () => {
        router.push("/admin/blogs");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/blogs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                {blog.title}
              </h1>
              <Badge
                variant={blog.status === "published" ? "default" : "secondary"}
                className={
                  blog.status === "published"
                    ? "bg-green-500/10 text-green-500"
                    : ""
                }
              >
                {blog.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{blog.excerpt}</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isUpdating}>
          {isUpdating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Update Post
        </Button>
      </div>

      {/* Meta summary */}
      <div className="flex flex-wrap gap-4 rounded-2xl border border-border bg-muted/50 p-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Slug: </span>
          <span className="font-mono text-xs">{blog.slug}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Read Time: </span>
          <span>{blog.readTime}</span>
        </div>
        {blog.coverImg && (
          <div className="text-sm">
            <span className="text-muted-foreground">Cover: </span>
            <span className="max-w-48 truncate font-mono text-xs">
              {blog.coverImg}
            </span>
          </div>
        )}
      </div>

      {/* Content Editor */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Blog Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here... (Markdown supported)"
            className="min-h-125 font-mono text-sm leading-relaxed"
          />
        </CardContent>
      </Card>
    </div>
  );
}
