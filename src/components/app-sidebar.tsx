'use client'
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {
    LayoutDashboard,
    UsersRound,
    Waypoints,
    PersonStanding,
    Workflow,
    LogOut, ShieldAlert, Joystick, StickyNote
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {signOutAction} from "@/actions/appActions";
import AppToolkit from "@/lib/app-toolkit";
import {useEffect, useState} from "react";
import {getBarangay} from "@/actions/barangayActions";
import Barangay from "@/types/barangayType";

const managementItems = [
    {
        title: "Announcement",
        url: "/barangayAdmin/page/announcement",
        icon: StickyNote
    },
    {
        title: "League",
        url: "/barangayAdmin/page/league",
        icon: Waypoints
    },
    {
        title: "Player Submission",
        url: "/barangayAdmin/page/players",
        icon: PersonStanding
    },
    {
        title: "Team & Bracket",
        url: "/barangayAdmin/page/team",
        icon: UsersRound
    },
    {
        title: "Schedule & Match Team",
        url: "/barangayAdmin/page/match",
        icon: Workflow
    },
    {
        title: "Live Game",
        url: "/barangayAdmin/page/game",
        icon: Joystick
    }
]

export function BarangayAppSidebar() {
    const [barangay, setBarangay] = useState<Barangay | null>(null)
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const { barangay: currentBrgy} = await getBarangay();
            setBarangay(currentBrgy)
            setIsLoading(false)
        })()
    }, []);

    const handleSignOut = async () => {
        await signOutAction('/auth/admin/login')
    }

    function hasSideBar () {
        if(isLoading){
            return (
                <div className={'h-full w-full grid place-items-center'}>
                    Loading sidebar...
                </div>
            )
        }else{
            return (
                <>
                    <SidebarHeader>
                        <SidebarMenu>
                            <Link href={'/'}>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="flex items-center justify-center">
                                        <Avatar className={'aspect-square size-8 rounded-none'}>
                                            <AvatarImage src={AppToolkit.ImageWithFallBack(barangay?.barangayImage).toString()} />
                                            <AvatarFallback></AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                              {barangay?.barangayName || "Barangay Name"}
                            </span>
                                    </div>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarMenuButton asChild id={'dashboard'}>
                                <Link href={'/barangayAdmin'}>
                                    <LayoutDashboard/>
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton asChild id={'administration'}>
                                <Link href={'/barangayAdmin/page/administration'}>
                                    <ShieldAlert/>
                                    <span>Administration</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarGroup>

                        <SidebarGroup id={'manage'}>
                            <SidebarGroupLabel>Manage</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {managementItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuButton onClick={handleSignOut}>
                                <LogOut />
                                <span>Sign out</span>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarFooter>
                </>
            )
        }
    }

    return (
        <Sidebar>
            {hasSideBar()}
        </Sidebar>
    )
}
