import {Button} from "@/components/ui/button";
import {LucideIcon} from "lucide-react";
import {ReactNode} from "react";

type LoadingButtonProps = {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    size?:  "default" | "sm" | "lg" | "icon" | null | undefined
    type?: 'button' | 'submit' | 'reset';
    Icon: LucideIcon;
    state: boolean;
    pendingText: string;
    children?: ReactNode
}

export function LoadingButton({variant, size,type, Icon, pendingText, children, state}:LoadingButtonProps){
    return (
        <Button variant={variant} size={size} type={type} disabled={state} className="">
            { state && <Icon className={'animate-spin icon-sm'}/>}
            { state ? pendingText : children}
        </Button>
    )
}