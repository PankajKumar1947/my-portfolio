export const noteQueries = {
  all: {
    key: ["notes", "admin"],
    endpoint: "/admin/notes",
  },
  published: {
    key: ["notes", "published"],
    endpoint: "/notes",
  },
  details: (id: string) => ({
    key: ["notes", id],
    endpoint: `/admin/notes/${id}`,
  }),
  bySlug: (slug: string) => ({
    key: ["notes", "slug", slug],
    endpoint: `/notes/slug/${slug}`,
  }),
  pageContent: (slug: string, pageId: string) => ({
    key: ["notes", "slug", slug, "pages", pageId],
    endpoint: `/notes/slug/${slug}/pages/${pageId}`,
  }),
  create: {
    key: ["notes", "create"],
    endpoint: "/admin/notes",
  },
  update: (id: string) => ({
    key: ["notes", "update", id],
    endpoint: `/admin/notes/${id}`,
  }),
  delete: (id: string) => ({
    key: ["notes", "delete", id],
    endpoint: `/admin/notes/${id}`,
  }),
};
