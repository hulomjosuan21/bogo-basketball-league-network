'use client'
import {ReactNode} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {BarangayAppSidebar} from "@/components/app-sidebar";
import {ToggleTheme} from "@/components/toggle-theme";
import useDriver from "@/hooks/use-driver";
import {Button} from "@/components/ui/button";
import {Info} from "lucide-react";

export default function Layout({children}:{children: ReactNode}){
    const { start } = useDriver()

    const handleDriver = () => {
        const steps = [
            {
                element: '#dashboard',
                popover: {
                    title: 'Test',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, rem!',
                },
            },
            {
                element: '#administration',
                popover: {
                    title: 'Test',
                    description: 'Lorem ipsum dolor sit amet.',
                },
            },
            {
                element: '#manage',
                popover: {
                    title: 'Test',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, rem!',
                },
            },
            {
                element: '#game',
                popover: {
                    title: 'Test',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, rem!',
                },
            }
        ];
        start(steps)
    }
    return (
        <SidebarProvider className={'with-sidebar'}>
            <BarangayAppSidebar barangay={null}/>
            <main>
                <div className={'sidebar-trigger'}>
                    <SidebarTrigger />
                    <div className={'flex items-center gap-4'}>
                        <Button className={'h-7 w-7'} variant={'ghost'} onClick={handleDriver}><Info className={'icon-sm'}/></Button>
                        <ToggleTheme btnClassName={'h-7 w-7'} btnVariant={'ghost'}/>
                    </div>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}