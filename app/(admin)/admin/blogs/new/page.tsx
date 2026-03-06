"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface BlogMeta {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  readTime: string;
  status: string;
}

export default function BlogContentEditorPage() {
  const router = useRouter();
  const [meta, setMeta] = React.useState<BlogMeta | null>(null);
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    const stored = sessionStorage.getItem("blog-draft-meta");
    if (stored) {
      const parsed = JSON.parse(stored);
      setMeta(parsed);
      if (parsed.content) {
        setContent(parsed.content);
      }
    } else {
      router.replace("/admin/blogs");
    }
  }, [router]);

  if (!meta) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const handleSave = () => {
    const blogData = { ...meta, content };
    console.log("Saving blog:", blogData);
    sessionStorage.removeItem("blog-draft-meta");
    router.push("/admin/blogs");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              {meta.title}
            </h1>
            <Badge
              variant={meta.status === "published" ? "default" : "secondary"}
              className={
                meta.status === "published"
                  ? "bg-green-500/10 text-green-500"
                  : ""
              }
            >
              {meta.status === "published" ? "Published" : "Draft"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{meta.excerpt}</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Post
        </Button>
      </div>

      {/* Meta summary */}
      <div className="flex flex-wrap gap-4 rounded-2xl border border-border bg-muted/50 p-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Slug: </span>
          <span className="font-mono text-xs">{meta.slug}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Read Time: </span>
          <span>{meta.readTime}</span>
        </div>
        {meta.coverImage && (
          <div className="text-sm">
            <span className="text-muted-foreground">Cover: </span>
            <span className="max-w-48 truncate font-mono text-xs">
              {meta.coverImage}
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
