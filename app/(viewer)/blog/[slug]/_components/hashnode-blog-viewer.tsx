"use client";

import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/config/profile";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { HashnodePost } from "@/services/hashnode.service";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Eye, Heart, MessageSquare, ExternalLink, Clock } from "lucide-react";
import { useState } from "react";

interface HashnodeBlogViewerProps {
  post: HashnodePost;
}

const CopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-green-500" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};

export function HashnodeBlogViewer({ post }: HashnodeBlogViewerProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const hashnodeHost = (profile as { hashnodeHost?: string }).hashnodeHost || "pankajkry.hashnode.dev";
  const hashnodeUrl = `https://${hashnodeHost}/${post.slug}`;

  // Fix Hashnode-specific image syntax: ![](url align="center") -> ![](url)
  const processedMarkdown = (post.content?.markdown || "").replace(
    /!\[(.*?)\]\((.*?) align="center"\)/g,
    "![$1]($2)"
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-(--max-width) items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild title="Back to Blog">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-lg font-semibold tracking-tight truncate max-w-[200px] sm:max-w-md text-foreground">
              {post.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <div className="mx-auto max-w-(--max-width) px-4 pt-8 sm:px-6 lg:px-8">
          <article className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-8 lg:p-12 rounded-3xl overflow-hidden shadow-2xl">
            {/* Cover Image */}
            {post.coverImage?.url && (
              <div className="relative mb-8 h-[250px] sm:h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Header */}
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-6 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {post.title}
              </h1>

              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold uppercase">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-foreground">{profile.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary/60" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary/60" />
                    <span>{post.readTimeInMinutes} min read</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-10 bg-border/40" />

            {/* Content */}
            <div className="prose dark:prose-invert prose-slate max-w-none 
              prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-20
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-ul:marker:text-primary
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6 prose-ol:marker:text-primary
              prose-li:text-muted-foreground prose-li:my-2
              prose-a:text-primary hover:prose-a:underline 
              prose-pre:bg-transparent prose-pre:p-0
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
              prose-a:text-primary hover:prose-a:underline">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkEmoji, remarkBreaks]}
                rehypePlugins={[rehypeRaw, rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append", content: { type: "text", value: "" } }]]}
                components={{
                  code({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeContent = String(children).replace(/\n$/, "");

                    return !inline && match ? (
                      <div className="not-prose overflow-hidden rounded-2xl border border-border/50 shadow-2xl bg-[#282c34]">
                        <div className="flex items-center justify-between bg-black/20 px-5 py-2.5 border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5 mr-2">
                              <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                              <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                            </div>
                            <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
                              {match[1]}
                            </span>
                          </div>
                          <CopyButton content={codeContent} />
                        </div>
                        <SyntaxHighlighter
                          style={oneDark as unknown as { [key: string]: React.CSSProperties }}
                          language={match[1]}
                          PreTag="div"
                          showLineNumbers={true}
                          lineNumberStyle={{
                            minWidth: "2.5em",
                            paddingRight: "1em",
                            color: "rgba(255,255,255,0.2)",
                            textAlign: "right",
                            userSelect: "none",
                          }}
                          customStyle={{
                            margin: 0,
                            padding: "1rem",
                            fontSize: "0.9rem",
                            background: "transparent",
                            lineHeight: "1.6",
                          }}
                        >
                          {codeContent}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  img: ({ node, ...props }: React.ComponentPropsWithoutRef<'img'> & { node?: unknown }) => (
                    <img
                      {...props}
                      className="mx-auto rounded-xl shadow-lg border border-border/10 my-4"
                      loading="lazy"
                    />
                  ),
                  a: ({ node, ...props }: React.ComponentPropsWithoutRef<'a'> & { node?: unknown }) => {
                    const isInternal = props.href?.startsWith("#");
                    return (
                      <a
                        {...props}
                        target={isInternal ? undefined : "_blank"}
                        rel={isInternal ? undefined : "noopener noreferrer"}
                      />
                    );
                  },
                }}
              >
                {processedMarkdown}
              </ReactMarkdown>
            </div>

            <div className="space-y-12 pt-10">
              {/* Bottom Stats Row (Small Pills) */}
              <div className="flex items-center justify-center gap-3 py-6">
                <div className="flex items-center gap-1.5 bg-muted/30 px-3 py-1.5 rounded-full border border-border/50 text-xs font-medium text-muted-foreground/80">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{post.views} views</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted/30 px-3 py-1.5 rounded-full border border-border/50 text-xs font-medium text-muted-foreground/80">
                  <Heart className="h-3.5 w-3.5" />
                  <span>{post.reactionCount} likes</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted/30 px-3 py-1.5 rounded-full border border-border/50 text-xs font-medium text-muted-foreground/80">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{post.responseCount} comments</span>
                </div>
              </div>

              {/* Comments CTA */}
              <div className="rounded-3xl border border-border/50 bg-linear-to-b from-card/50 to-background/50 p-8 sm:p-12 text-center shadow-xl">
                <div className="max-w-md mx-auto space-y-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Community Discussion</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {post.responseCount > 0
                        ? `There are already ${post.responseCount} comments on this post. Join the conversation and share your thoughts!`
                        : "Be the first to comment! Share your feedback or questions about this article."}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button asChild size="lg" className="rounded-full px-8 gap-2 h-12">
                      <a href={`${hashnodeUrl}#comments`} target="_blank" rel="noopener noreferrer">
                        Add a comment
                        <MessageSquare className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2 h-12 border-primary/20 hover:border-primary transition-all">
                      <a href={hashnodeUrl} target="_blank" rel="noopener noreferrer">
                        Read all comments
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl bg-muted/20 border border-border/50">
                <Avatar className="h-20 w-20 border-4 border-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold uppercase">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left flex-1">
                  <h4 className="text-xl font-bold text-foreground mb-1">{profile.name}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{profile.tagline}</p>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-xl">
                    Software Engineer and technical writer sharing insights on modern web development.
                    Follow me for more tutorials and deep dives.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="rounded-full gap-2">
                  <a href={`https://${hashnodeHost}`} target="_blank" rel="noopener noreferrer">
                    Follow
                  </a>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
