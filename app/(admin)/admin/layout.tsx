import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AdminHeader } from "../_components/admin-header";
import { NuqsAdapter } from "nuqs/adapters/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <NuqsAdapter>
          <div className="flex-1 p-6">{children}</div>
        </NuqsAdapter>
      </SidebarInset>
    </SidebarProvider>
  );
}
