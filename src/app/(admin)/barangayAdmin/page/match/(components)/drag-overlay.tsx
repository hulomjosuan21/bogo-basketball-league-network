import { DragOverlay } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import AppToolkit from "@/lib/app-toolkit";

interface DraggingOverlayProps {
    name: string | null,
    teamImage: string | null
}

export function DraggingOverlay({ name, teamImage }: DraggingOverlayProps) {
    if (!name) return null

    return (
        <DragOverlay dropAnimation={null}>
            <div
                className="p-4 bg-s border rounded-lg shadow-lg cursor-grabbing bg-background flex items-center gap-2"
                style={{
                    transform: CSS.Transform.toString({
                        x: 0,
                        y: 0,
                        scaleX: 1.05,
                        scaleY: 1.05,
                    }),
                }}
            >
                <Avatar className={'rounded-md'}>
                    <AvatarImage src={AppToolkit.ImageWithFallBack(teamImage).toString()} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {name}
            </div>
        </DragOverlay>
    )
}

