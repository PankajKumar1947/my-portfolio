import { FileText, BookOpen, FolderKanban, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notes, projects } from "@/lib/mock-data";

const stats = [
  {
    title: "Total Projects",
    value: projects.length,
    icon: FolderKanban,
    description: `${projects.filter((p) => p.featured).length} featured`,
  },
  {
    title: "Blog Posts",
    value: 0,
    icon: FileText,
    description: `0 published`,
  },
  {
    title: "Notes",
    value: notes.length,
    icon: BookOpen,
    description: `${notes.reduce((acc, n) => acc + n.pages.length, 0)} total pages`,
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
          {/* <CardContent className="space-y-3">
            {[].slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-lg border border-border/30 p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`ml-3 rounded-full px-2 py-0.5 text-xs ${post.published
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                    }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
            ))}
          </CardContent> */}
        </Card>

        {/* Recent Notes */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-base">Recent Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notes.slice(0, 3).map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between rounded-lg border border-border/30 p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{note.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {note.pages.length} pages •{" "}
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`ml-3 rounded-full px-2 py-0.5 text-xs ${note.published
                    ? "bg-green-500/10 text-green-500"
                    : "bg-yellow-500/10 text-yellow-500"
                    }`}
                >
                  {note.published ? "Published" : "Draft"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
