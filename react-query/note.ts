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
  adminPageContent: (id: string, pageId: string) => ({
    key: ["notes", "admin", id, "pages", pageId],
    endpoint: `/admin/notes/${id}/pages/${pageId}`,
  }),
  pageParent: (pageId: string) => ({
    key: ["notes", "admin", "pages", pageId, "parent"],
    endpoint: `/admin/notes/pages/${pageId}/parent`,
  }),
  create: {
    key: ["notes", "create"],
    endpoint: "/admin/notes",
  },
  update: (id: string) => ({
    key: ["notes", "update", id],
    endpoint: `/admin/notes/${id}`,
  }),
  updatePage: (id: string, pageId: string) => ({
    key: ["notes", "update", id, "pages", pageId],
    endpoint: `/admin/notes/${id}/pages/${pageId}`,
  }),
  createPage: (id: string) => ({
    key: ["notes", "create-page", id],
    endpoint: `/admin/notes/${id}/pages`,
  }),
  reorderPages: (id: string) => ({
    key: ["notes", "reorder-pages", id],
    endpoint: `/admin/notes/${id}/pages`,
  }),
  delete: (id: string) => ({
    key: ["notes", "delete", id],
    endpoint: `/admin/notes/${id}`,
  }),
};
