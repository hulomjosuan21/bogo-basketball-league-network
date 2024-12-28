import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {Dock, DockIcon} from "@/components/ui/dock";
import {LucideIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {ToggleTheme} from "@/components/toggle-theme";
import {Separator} from "@/components/ui/separator";
import favicon from "@/assets/favicon.svg"

type dockItem = {
    Icon: LucideIcon,
    text: string,
    url: string
}

type Props = {
    dockItems: dockItem[]
}

export default function AppDock({dockItems}:Props) {
    const DockItem = ({Icon, text,url}:dockItem) => (
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
        <TooltipProvider>
            <Dock className={'motion-preset-compress m-0'}>
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
                {
                    dockItems.map((item,index) => (
                        <DockIcon key={index}>
                            <DockItem Icon={item.Icon} text={item.text} url={item.url}/>
                        </DockIcon>
                    ))
                }
                <Separator orientation={'vertical'} className={'h-full'}/>
                <DockIcon>
                    <ToggleTheme btnClassName={'rounded-full'} btnVariant={'ghost'}/>
                </DockIcon>
            </Dock>
        </TooltipProvider>
    );
}