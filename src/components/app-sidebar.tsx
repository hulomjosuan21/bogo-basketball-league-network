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
    CalendarCheck2,
    LogOut, ShieldAlert,Joystick
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {signOutAction} from "@/actions/appActions";
import Barangay from "@/types/barangayType";
import AppToolkit from "@/lib/app-toolkit";

const managementItems = [
    {
        title: "League",
        url: "/barangayAdmin/page/league",
        icon: Waypoints
    },
    {
        title: "Player",
        url: "/barangayAdmin/page/players",
        icon: PersonStanding
    },
    {
        title: "Team",
        url: "/barangayAdmin/page/team",
        icon: UsersRound
    },
    {
        title: "Bracket",
        url: "/barangayAdmin/page/bracket",
        icon: Workflow
    },
    {
        title: "Schedule Game",
        url: "/barangayAdmin/page/schedule",
        icon: CalendarCheck2
    },
    {
        title: "Game",
        url: "/barangayAdmin/page/game",
        icon: Joystick
    }
]

type Props = {
    barangay: Barangay | null
}

export function BarangayAppSidebar({barangay}:Props) {

    const handleSignOut = async () => {
        await signOutAction('/auth/admin/login')
    }

    return (
        <Sidebar>
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
        </Sidebar>
    )
}
