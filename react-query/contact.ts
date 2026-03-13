export const contactQueries = {
  all: {
    key: ["contacts", "admin"],
    endpoint: "/admin/contacts",
  },
  details: (id: string) => ({
    key: ["contacts", "details", id],
    endpoint: `/admin/contacts/${id}`,
  }),
  update: (id: string) => ({
    key: ["contacts", "update", id],
    endpoint: `/admin/contacts/${id}`,
  }),
  delete: (id: string) => ({
    key: ["contacts", "delete", id],
    endpoint: `/admin/contacts/${id}`,
  }),
  submit: {
    key: ["contacts", "submit"],
    endpoint: "/contact",
  }
};
