export const blogQueries = {
  all: {
    key: ["blogs"],
    endpoint: "/blogs",
  },
  details: (slug: string) => ({
    key: ["blogs", slug],
    endpoint: `/blogs/${slug}`,
  }),
  create: {
    key: ["blogs", "create"],
    endpoint: "/blogs",
  },
  update: (id: string) => ({
    key: ["blogs", "update", id],
    endpoint: `/blogs/${id}`,
  }),
  delete: (id: string) => ({
    key: ["blogs", "delete", id],
    endpoint: `/blogs/${id}`,
  }),
  byId: (id: string) => ({
    key: ["blogs", "id", id],
    endpoint: `/blogs/id/${id}`,
  }),
};
