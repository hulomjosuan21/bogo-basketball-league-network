import {Separator} from "@/components/ui/separator";
import AppToolkit from "@/lib/app-toolkit";
import { ReactNode}  from "react";

type Props = {
    title?: string
    children: ReactNode
}

export default function PlayerNumberStat({children,title}:Props){
    return (
        <div className={'w-full max-w-xs h-44 rounded-md bg-secondary flex flex-col items-center p-2'}>

            <div className={'w-full'}>
                <span className={'font-semibold'}>{AppToolkit.TextWithFallBack(title)}</span>
            </div>

            <div className={'flex-1'}>
                {children}
            </div>

            <div className={'w-full'}>
                <Separator/>
            </div>

        </div>
    )
}