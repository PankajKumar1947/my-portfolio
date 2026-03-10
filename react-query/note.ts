export const noteQueries = {
  all: {
    key: ["notes"],
    endpoint: "/notes",
  },
  details: (id: string) => ({
    key: ["notes", id],
    endpoint: `/notes/${id}`,
  }),
  create: {
    key: ["notes", "create"],
    endpoint: "/notes",
  },
  update: (id: string) => ({
    key: ["notes", "update", id],
    endpoint: `/notes/${id}`,
  }),
  delete: (id: string) => ({
    key: ["notes", "delete", id],
    endpoint: `/notes/${id}`,
  }),
};
