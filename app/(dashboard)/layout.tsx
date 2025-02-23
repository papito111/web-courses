import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { UserButton } from "@clerk/nextjs";
import  Navbar  from "@/components/ui/navbar"


const Dashboard = ({children}:{children:React.ReactNode}) => {
    return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Navbar>
        </Navbar>
        <div className="h-full flex items-center justify-center">
          {children}
            </div>
      </main>
     
    </SidebarProvider>
  )
}
export default Dashboard;