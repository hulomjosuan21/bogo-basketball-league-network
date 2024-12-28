'use client'
import {LoaderCircle} from "lucide-react";

export default function Loading({height = 'h-screen', text = 'Loading...'}:{height?: string,text?: string}) {
    return (
        <div className={`${height} grid place-items-center`}>
            <div className={'flex items-center justify-center gap-4 motion-preset-fade'}>
                <LoaderCircle className={'animate-spin text-orange-400'}/>
                {text}
            </div>
        </div>
    )
}