export const todoQueries = {
  all: {
    key: ["todos", "admin"],
    endpoint: "/admin/todos",
  },
  byDate: (date: string) => ({
    key: ["todos", "admin", "date", date],
    endpoint: `/admin/todos?date=${date}`,
  }),
  byMonth: (month: string) => ({
    key: ["todos", "admin", "month", month],
    endpoint: `/admin/todos?month=${month}`,
  }),
  create: {
    key: ["todos", "admin", "create"],
    endpoint: "/admin/todos",
  },
  update: (id: string) => ({
    key: ["todos", "admin", "update", id],
    endpoint: `/admin/todos/${id}`,
  }),
  delete: (id: string) => ({
    key: ["todos", "admin", "delete", id],
    endpoint: `/admin/todos/${id}`,
  }),
};
