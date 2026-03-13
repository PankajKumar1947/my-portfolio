"use client"

import * as React from "react"
import {
  FileText,
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  Settings,
  ArrowLeft,
  CalendarDays,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { useAuthSession } from "@/hooks/query/use-auth"
import { profileInfo } from "@/lib/mock-data"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "Portfolio Admin",
      logo: LayoutDashboard,
      plan: "Production",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Planner",
      url: "/admin/planner",
      icon: CalendarDays,
    },
    {
      title: "Blogs",
      url: "/admin/blogs",
      icon: FileText,
    },
    {
      title: "Notes",
      url: "/admin/notes",
      icon: BookOpen,
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: FolderKanban,
    },
  ],
  secondaryNav: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
    {
      title: "Back to Site",
      url: "/",
      icon: ArrowLeft,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useAuthSession();
  const Logo = data.teams[0].logo

  const user = {
    name: session?.user?.name || "Loading...",
    email: session?.user?.email || "...",
    avatar: session?.user?.avatar || profileInfo.profileImage,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Logo className="size-4" />
              </div>
              <div className="grid flex-1 leading-tight">
                <span className="truncate font-semibold">{data.teams[0].name}</span>
                <span className="truncate text-xs">{data.teams[0].plan}</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
