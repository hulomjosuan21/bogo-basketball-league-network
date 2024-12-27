"use client";
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {Dock, DockIcon} from "@/components/ui/dock";
import {House, LucideIcon,ChartBarStacked, UserRound} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {ToggleTheme} from "@/components/toggle-theme";
import {Separator} from "@/components/ui/separator";
import favicon from "@/assets/favicon.svg"

export function PlayerDock() {
    const DockItem = ({Icon, text,url}:{Icon: LucideIcon,text: string, url: string}) => (
        <Tooltip>
            <TooltipTrigger asChild={true}>
                <Link
                    href={url}
                    aria-label={text}
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "rounded-full",
                    )}
                >
                    <Icon className={'icon-sm'}/>
                </Link>
            </TooltipTrigger>
            <TooltipContent>
                <span>{text}</span>
            </TooltipContent>
        </Tooltip>
    )

    return (
        <div className="relative">
            <TooltipProvider>
                <Dock direction="middle" className={'motion-preset-compress'}>
                    <DockIcon>
                        <Tooltip>
                            <TooltipTrigger asChild={true}>
                                <Link
                                    href={'/'}
                                    aria-label={'landing page'}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "icon" }),
                                        "rounded-full",
                                    )}
                                >
                                    <div className="w-4">
                                        <AspectRatio ratio={1}>
                                            <Image src={favicon} alt="Image" className="object-cover"/>
                                        </AspectRatio>
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span>Bogo Basketball League Network</span>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                    <Separator orientation={'vertical'} className={'h-full'}/>
                    <DockIcon>
                        <DockItem Icon={House} text={'Home'} url={'/'}/>
                    </DockIcon>
                    <DockIcon>
                        <DockItem Icon={ChartBarStacked} text={'Leaderboard'} url={'/'}/>
                    </DockIcon>
                    <DockIcon>
                        <DockItem Icon={UserRound} text={'Profile'} url={'/'}/>
                    </DockIcon>
                    <Separator orientation={'vertical'} className={'h-full'}/>
                    <DockIcon>
                        <ToggleTheme btnClassName={'rounded-full'} btnVariant={'ghost'}/>
                    </DockIcon>
                </Dock>
            </TooltipProvider>

        </div>
    );
}