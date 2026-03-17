import { Metadata } from "next";
import { BlogTable } from "./_components/blogs-table";

export const metadata: Metadata = {
  title: "Blogs | Admin",
  description: "Manage your blog posts.",
};

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <BlogTable />
    </div>
  );
}
