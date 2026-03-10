"use client"

import * as React from "react"
import {
  FileText,
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  Settings,
  ArrowLeft,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { profileInfo } from "@/lib/mock-data"

const data = {
  user: {
    name: profileInfo.name,
    email: profileInfo.email,
    avatar: profileInfo.profileImage,
  },
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
