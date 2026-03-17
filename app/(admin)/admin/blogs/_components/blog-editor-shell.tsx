"use client";

import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import { Loader } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useUpdateBlog } from "@/hooks/mutation/use-blog";
import { useAdminBlog } from "@/hooks/query/use-blog";
import { Editor } from "@/components/text-editor/dynamic-editor";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";

interface BlogEditorShellProps {
  id: string;
}

export function BlogEditorShell({ id }: BlogEditorShellProps) {
  const router = useRouter();
  const { data: blog, isLoading, error } = useAdminBlog(id);
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog(id);

  useEffect(() => {
    if (blog?.content) {
      setContent(blog.content);
    }
  }, [blog?.content]);

  const debouncedSave = useDebouncedCallback((newContent: string) => {
    setSaveStatus("saving");
    updateBlog(
      { content: newContent },
      {
        onSuccess: () => setSaveStatus("saved"),
        onError: () => setSaveStatus("unsaved"),
      }
    );
  }, 2000);

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
    setSaveStatus("saving");
    updateBlog(
      { content },
      {
        onSuccess: () => setSaveStatus("saved"),
        onError: () => setSaveStatus("unsaved"),
      }
    );
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
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground mr-2">
            {saveStatus === "saving" && "Saving..."}
            {saveStatus === "unsaved" && "Unsaved changes"}
            {saveStatus === "saved" && "Saved"}
          </span>
          <Button onClick={handleSave} disabled={isUpdating || saveStatus === "saving" || saveStatus === "saved"}>
            {isUpdating || saveStatus === "saving" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Save"}
          </Button>
        </div>
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
          <Editor
            initialContent={blog.content}
            onChange={(val) => {
              if (val !== content) {
                setSaveStatus("unsaved");
              }
              setContent(val);
              debouncedSave(val);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
