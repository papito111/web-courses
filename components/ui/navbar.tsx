// components/ui/navbar.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
    return (
      <nav className="bg-gray-900 text-white p-4 w-full">
        <div className="  flex justify-between items-center w-full">
        <SidebarTrigger />

          <div className="text-xl font-semibold">Engineer Academy</div>
       
            <UserButton/>
            
            </div>
       
      </nav>
    );
  };
  
  export default Navbar;
  