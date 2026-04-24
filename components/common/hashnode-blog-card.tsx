"use client";

import Link from "next/link";
import { HashnodePost } from "@/services/hashnode.service";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface HashnodeBlogCardProps {
  post: HashnodePost;
  index: number;
}

export function HashnodeBlogCard({ post, index }: HashnodeBlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="flex h-full w-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full w-full group">
        <Card className="relative h-full w-full overflow-hidden border border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/60 p-6 sm:p-8 rounded-2xl flex flex-col gap-4">
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground/70">
            {post.brief}
          </p>
          
          <div className="flex items-center justify-between gap-2 pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground/50 font-medium">
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{post.readTimeInMinutes} min read</span>
              <span>•</span>
              <span>{post.views} views</span>
            </div>
            
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
