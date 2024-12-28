import {ReactNode} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";

export default function Layout({children}:{children: ReactNode}){
    return (
        <SidebarProvider className={'with-sidebar'}>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}