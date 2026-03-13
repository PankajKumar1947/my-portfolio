import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { connectDB } from "@/lib/db";
import { getPublishedBlogsService } from "@/services/blog.service";
import { getPublishedNotesService } from "@/services/note.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic routes from database
  await connectDB();

  const [blogs, notes] = await Promise.all([
    getPublishedBlogsService(),
    getPublishedNotesService(),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt || blog.createdAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const noteRoutes: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: note.updatedAt || note.createdAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...noteRoutes];
}
