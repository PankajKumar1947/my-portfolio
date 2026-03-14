export const plannerDayQueries = {
  byDate: (date: string) => ({
    key: ["planner-day", "admin", "date", date],
    endpoint: `/admin/planner-day?date=${date}`,
  }),
  upsert: {
    key: ["planner-day", "admin", "upsert"],
    endpoint: "/admin/planner-day",
  },
};
