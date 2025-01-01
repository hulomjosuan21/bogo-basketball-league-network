import { useDroppable } from "@dnd-kit/core"
import {ToMatchTeam} from "@/app/(admin)/barangayAdmin/page/match/(types)/teamType";

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
                isOver ? "border-primary bg-primary/10" : "border-gray-200"
            }`}
        >
            {team ? (
                <div className="p-4 border rounded-md shadow">{team.teamName}</div>
            ) : (
                <p className="text-secondary-foreground">{title}</p>
            )}
        </div>
    )
}

