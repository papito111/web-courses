// components/ui/navbar.tsx
"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from "next/navigation";
import {NavbarRoutes} from "@/components/navbar-routes"
const Navbar = () => {

    return (
      <nav className="bg-gray-900 sticky text-white p-4 w-full">
        <div className="  flex justify-between items-center w-full">
        <SidebarTrigger />
          <div className="sticky">
            <div className="text-xl ml-5  font-semibold">Engineer Academy</div>
            
          </div>
            <NavbarRoutes/>
            
            </div>
       
      </nav>
    );
  };
  
  export default Navbar;
  



