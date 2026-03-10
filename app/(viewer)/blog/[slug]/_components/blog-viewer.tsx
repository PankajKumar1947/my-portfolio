"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { profileInfo } from "@/lib/mock-data";
import { ThemeToggle } from "@/components/common/theme-toggle";

interface BlogViewerProps {
  post: any;
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
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {profileInfo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{profileInfo.name}</p>
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
            </header>

            <Separator className="mb-8 opacity-50" />

            <Card className="border-border/50 bg-card">
              <CardContent className="p-6 sm:p-8">
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {post.content}
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </main>
    </div>
  );
}
