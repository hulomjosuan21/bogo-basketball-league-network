
import {ReactNode} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {BarangayAppSidebar} from "@/components/app-sidebar";
import {ToggleTheme} from "@/components/toggle-theme";
import {getBarangay} from "@/actions/barangayActions";

export default async function Layout({children}:{children: ReactNode}){
    const { barangay } = await getBarangay();

    if(!barangay){
        return null
    }

    return (
        <SidebarProvider className={'with-sidebar'}>
            <BarangayAppSidebar barangay={barangay}/>
            <main>
                <div className={'sidebar-trigger'}>
                    <SidebarTrigger />
                    <ToggleTheme btnClassName={'h-7 w-7'} btnVariant={'ghost'}/>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}