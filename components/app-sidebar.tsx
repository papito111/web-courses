"use client"
import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  versions: [],
  navMain: [
    {
      title: "Courses",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Test",
          url: "/test",
        },
        {
          title: "Browse",
          url: "/search",
        },
        {
          title: "Sign-in",
          url: "/sign-in",
        },
        {
          title: "Sign-up",
          url: "/sign-up",
        },
        
      ],
      
    },
    
   
    
  ],
}

const Teacher_data = {
  versions: [],
  navMain: [
    {
      title: "Teacher",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Analytics",
          url: "/teacher/analytics",
        },
        {
          title: "Courses",
          url: "/teacher/courses",
        },
        {
          title: "Sign-in",
          url: "/sign-in",
        },
        {
          title: "Sign-up",
          url: "/sign-up",
        },
        
      ],
      
    },
    
   
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? Teacher_data: data;
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>

                    <SidebarMenuButton asChild>
                    {/* <SidebarMenuButton asChild isActive={item.isActive}> */}

                      
                      <a href={item.url}>{item.title}</a>
                      
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            
          </SidebarGroup>
          
        ))}
        
      </SidebarContent>
      
      <SidebarRail />
    </Sidebar>
  )
}
