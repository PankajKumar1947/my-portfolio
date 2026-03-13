"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/common/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

// Map to override breadcrumb labels for specific paths
const BREADCRUMB_OVERRIDES: Record<string, string> = {};

export function setBreadcrumbOverride(segment: string, label: string) {
  BREADCRUMB_OVERRIDES[segment] = label;
}

import { NavUser } from "@/components/nav-user";
import { useAuthSession } from "@/hooks/query/use-auth";
import { profile } from "@/config/profile";

export function AdminHeader() {
  const pathname = usePathname();
  const { data: session, isLoading } = useAuthSession();

  const user = {
    name: session?.user?.name || "Loading...",
    email: session?.user?.email || "...",
    avatar: session?.user?.avatar || profile.profileImage,
  };

  // Build breadcrumb segments
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((seg, index, arr) => {
      // Check sessionStorage for note/blog title when on "new" pages
      let label = seg.charAt(0).toUpperCase() + seg.slice(1);

      if (seg === "new") {
        // Try to get title from sessionStorage for context
        if (typeof window !== "undefined") {
          const parentSeg = arr[index - 1];
          if (parentSeg === "notes") {
            try {
              const meta = sessionStorage.getItem("note-draft-meta");
              if (meta) {
                const parsed = JSON.parse(meta);
                if (parsed.title) {
                  label =
                    parsed.title.length > 30
                      ? parsed.title.slice(0, 30) + "…"
                      : parsed.title;
                }
              }
            } catch { }
          } else if (parentSeg === "blogs") {
            try {
              const meta = sessionStorage.getItem("blog-draft-meta");
              if (meta) {
                const parsed = JSON.parse(meta);
                if (parsed.title) {
                  label =
                    parsed.title.length > 30
                      ? parsed.title.slice(0, 30) + "…"
                      : parsed.title;
                }
              }
            } catch { }
          }
        }
      }

      return {
        label,
        href: "/" + arr.slice(0, index + 1).join("/"),
        _raw: seg,
      };
    })
    .filter((s) => s._raw !== "admin");

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/50 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => (
            <React.Fragment key={segment.href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink href={segment.href}>
                  {segment.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-4" />
        <NavUser user={user} side="bottom" onlyAvatar={true} />
      </div>
    </header>
  );
}
