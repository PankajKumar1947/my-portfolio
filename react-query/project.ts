export const projectQueries = {
  all: {
    key: ["projects", "all"],
    endpoint: "/projects",
  },
  details: (id: string) => ({
    key: ["projects", "details", id],
    endpoint: `/projects/${id}`,
  }),
  create: {
    key: ["projects", "create"],
    endpoint: "/projects",
  },
  update: (id: string) => ({
    key: ["projects", "update", id],
    endpoint: `/projects/${id}`,
  }),
  delete: (id: string) => ({
    key: ["projects", "delete", id],
    endpoint: `/projects/${id}`,
  }),
};
