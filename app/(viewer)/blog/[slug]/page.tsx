"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import { BlogViewer } from "./_components/blog-viewer";
import { useBlog } from "@/hooks/query/use-blog";
import { Loader } from "@/components/common/loader";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = React.use(params);
  const { data: post, isLoading, error } = useBlog(slug);

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (error || !post) {
    notFound();
  }

  return <BlogViewer post={post} />;
}
