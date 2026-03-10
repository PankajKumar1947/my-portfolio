export const projectQueries = {
  all: {
    key: ["projects", "admin"],
    endpoint: "/admin/projects",
  },
  published: {
    key: ["projects", "published"],
    endpoint: "/projects",
  },
  details: (id: string) => ({
    key: ["projects", "details", id],
    endpoint: `/admin/projects/${id}`,
  }),
  create: {
    key: ["projects", "create"],
    endpoint: "/admin/projects",
  },
  update: (id: string) => ({
    key: ["projects", "update", id],
    endpoint: `/admin/projects/${id}`,
  }),
  delete: (id: string) => ({
    key: ["projects", "delete", id],
    endpoint: `/admin/projects/${id}`,
  }),
};
