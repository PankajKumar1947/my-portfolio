"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  FolderKanban,
  CalendarDays,
  ArrowLeft,
  Mail,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { NavUser } from "@/components/nav-user";
import { useAuthSession } from "@/hooks/query/use-auth";

const adminNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { title: "Planner", icon: CalendarDays, href: "/admin/planner" },
  { title: "Blogs", icon: FileText, href: "/admin/blogs" },
  { title: "Notes", icon: BookOpen, href: "/admin/notes" },
  { title: "Projects", icon: FolderKanban, href: "/admin/projects" },
  { title: "Messages", icon: Mail, href: "/admin/contacts" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useAuthSession();

  const user = session?.user || {
    name: "Loading...",
    email: "...",
    avatar: "",
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/50 p-4">
        <Link
          href="/admin"
          className="gradient-text text-lg font-bold tracking-tight"
        >
          Admin Panel
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href)
                    }
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-2 space-y-2">
        <Button variant="ghost" size="sm" asChild className="w-full justify-start h-9 px-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm">Back to Site</span>
          </Link>
        </Button>
        <NavUser user={user} side="right" />
      </SidebarFooter>
    </Sidebar>
  );
}
