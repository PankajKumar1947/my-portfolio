import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { BlogPost } from "@/lib/mock-data";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="card-glow group h-full border-border bg-card transition-all duration-300 hover:-translate-y-1">
        {/* Cover placeholder */}
        <div className="relative h-40 overflow-hidden rounded-t-lg bg-linear-to-br from-primary/15 via-primary/5 to-transparent">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-primary/15">
              {post.title.charAt(0)}
            </span>
          </div>
        </div>

        <CardHeader className="pb-2">
          <h3 className="line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
