'use client'
import {Button} from "@/components/ui/button";
import {Undo2} from "lucide-react";
import {useRouter} from "next/navigation";

type Props = {
    btnClassName?: string,
    btnVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null,
}

export default function SmallBackButton({ btnClassName, btnVariant }:Props){
    const router = useRouter()

    return (
        <>
            <Button variant={btnVariant} className={btnClassName} onClick={() => router.back()}>
                <Undo2 />
            </Button>
        </>
    )
}