export const blogQueries = {
  all: {
    key: ["blogs", "admin"],
    endpoint: "/admin/blogs",
  },
  published: {
    key: ["blogs", "published"],
    endpoint: "/blogs",
  },
  details: (slug: string) => ({
    key: ["blogs", "details", slug],
    endpoint: `/blogs/slug/${slug}`,
  }),
  create: {
    key: ["blogs", "create"],
    endpoint: "/admin/blogs",
  },
  update: (id: string) => ({
    key: ["blogs", "update", id],
    endpoint: `/admin/blogs/${id}`,
  }),
  delete: (id: string) => ({
    key: ["blogs", "delete", id],
    endpoint: `/admin/blogs/${id}`,
  }),
};
