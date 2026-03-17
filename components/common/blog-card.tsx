import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IBlog } from "@/types/blog.types";

interface BlogCardProps {
  post: IBlog;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group h-full">
      <Card className="relative h-full overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-card-hover active:scale-[0.98]">
        {/* Cover placeholder with hover effect */}
        <div className="relative h-44 overflow-hidden rounded-t-lg bg-linear-to-br from-primary/10 via-primary/5 to-transparent transition-all duration-500 group-hover:scale-[1.02]">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-primary/10 transition-all duration-500 group-hover:scale-110 group-hover:text-primary/15">
              {post.title.charAt(0)}
            </span>
          </div>

        </div>

        <CardHeader className="pb-3 px-6">
          <h3 className="line-clamp-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="px-6 -mt-8">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground/80 transition-colors group-hover:text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 border-t border-border/40 pt-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 transition-colors group-hover:text-muted-foreground/80">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
        </CardContent>

      </Card>
    </Link>
  );
}
