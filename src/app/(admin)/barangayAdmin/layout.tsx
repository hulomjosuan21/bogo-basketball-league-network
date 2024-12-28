
import {ReactNode} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {BarangayAppSidebar} from "@/components/app-sidebar";
import {ToggleTheme} from "@/components/toggle-theme";
import {getBarangay} from "@/utils/supabase/server";

export default async function Layout({children}:{children: ReactNode}){
    const { barangayData } = await getBarangay();

    if(!barangayData){
        return null
    }

    return (
        <SidebarProvider className={'with-sidebar'}>
            <BarangayAppSidebar barangayName={barangayData.barangayName} barangayImage={barangayData.barangayImage}/>
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