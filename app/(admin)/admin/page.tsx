import { FileText, BookOpen, FolderKanban, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const stats = [
  {
    title: "Total Projects",
    value: 0,
    icon: FolderKanban,
    description: `0 featured`,
  },
  {
    title: "Blog Posts",
    value: 0,
    icon: FileText,
    description: `0 published`,
  },
  {
    title: "Notes",
    value: 0,
    icon: BookOpen,
    description: `0 total pages`,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your portfolio content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Items */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Blogs */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-base">Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent className="flex h-32 items-center justify-center text-muted-foreground">
            <p className="text-sm">No recent posts</p>
          </CardContent>
        </Card>

        {/* Recent Notes */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-base">Recent Notes</CardTitle>
          </CardHeader>
          <CardContent className="flex h-32 items-center justify-center text-muted-foreground">
            <p className="text-sm">No recent notes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
