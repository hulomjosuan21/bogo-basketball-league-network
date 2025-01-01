import { useDroppable } from "@dnd-kit/core"
import {ToMatchTeam} from "@/app/(admin)/barangayAdmin/page/match/(types)/teamType";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import AppToolkit from "@/lib/app-toolkit";

interface DropAreaProps {
    id: string
    title: string
    team: ToMatchTeam | null
}

export function DropArea({ id, title, team }: DropAreaProps) {
    const { setNodeRef, isOver } = useDroppable({ id })

    return (
        <div
            ref={setNodeRef}
            className={`p-6 rounded-lg border-2 border-dashed min-h-[120px] flex items-center justify-center ${
                isOver ? "border-background bg-primary/10" : "border-secondary"
            }`}
        >
            {team ? (
                <div className="p-4 border rounded-md shadow flex items-center gap-2">
                    <Avatar className={'rounded-md'}>
                        <AvatarImage src={AppToolkit.ImageWithFallBack(team.teamImage).toString()} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {team.teamName}
                </div>
            ) : (
                <p className="text-secondary-foreground">{title}</p>
            )}
        </div>
    )
}

