import { Metadata } from "next";
import { ProjectsTable } from "./_components/projects-table";

export const metadata: Metadata = {
  title: "Projects | Admin",
  description: "Manage your portfolio projects.",
};

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      <ProjectsTable />
    </div>
  );
}
