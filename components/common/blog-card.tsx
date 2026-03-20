"use client";

import Link from "next/link";
import { IBlog } from "@/types/blog.types";
import { motion } from "motion/react";

interface BlogCardProps {
  post: IBlog;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex items-baseline gap-3 py-1"
    >
      <span className="text-muted-foreground/40">•</span>
      <span className="shrink-0 font-mono italic text-muted-foreground/80">
        {formattedDate}
      </span>
      <span className="text-muted-foreground/40">:</span>
      <Link
        href={`/blog/${post.slug}`}
        className="font-medium text-primary hover:underline"
      >
        {post.title}
      </Link>
    </motion.div>
  );
}
