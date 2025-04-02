// components/ui/navbar.tsx
"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Ghost,  Home,  LogOut } from "lucide-react";
import { url } from "inspector";
import Link from "next/link";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

    return (
      <div className="flex gap-x-2 ml-auto">
        <Link href="/search">
          <Button className="mr-4 bg-slate-700" variant="ghost">
            <Home className="h-4 w-4 mr-2"></Home>
            
          </Button>
          </Link>
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
          <Button className="mr-4 bg-slate-700" variant="ghost">
            <LogOut className="h-4 w-4 mr-2"></LogOut>
            Exit
          </Button>
          </Link>
        ):(
          <Link href="/teacher/courses"><Button className="mr-4 bg-slate-700" variant="ghost">Teacher Mode</Button></Link>
          
       
      )}
      <UserButton></UserButton>
      </div>
    );
  };