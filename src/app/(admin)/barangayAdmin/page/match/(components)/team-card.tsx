import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import AppToolkit from "@/lib/app-toolkit";

interface TeamCardProps {
    id: string
    name: string
    isDragging?: boolean,
    teamImage: string | null
}

export function TeamCard({ id, name, isDragging, teamImage }: TeamCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`p-4 border rounded-lg shadow-sm cursor-move bg-background flex items-center gap-2 ${
                isDragging ? 'opacity-50' : ''
            }`}
        >
            <Avatar className={'rounded-md'}>
                <AvatarImage src={AppToolkit.ImageWithFallBack(teamImage).toString()} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {name}
        </div>
    )
}

