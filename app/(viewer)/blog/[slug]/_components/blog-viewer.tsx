"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/config/profile";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Editor } from "@/components/text-editor/dynamic-editor";
import { IBlog } from "@/types/blog.types";

interface BlogViewerProps {
  post: IBlog;
}

export function BlogViewer({ post }: BlogViewerProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-(--max-width) items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-lg font-semibold tracking-tight truncate max-w-50 sm:max-w-md">
              {post.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <article>
            <header className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{profile.name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-lg text-muted-foreground">
                {post.excerpt}
              </p>
            </header>

            <Separator className="mb-8 opacity-50" />

            <div>
              <Editor initialContent={post.content} editable={false} />
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
