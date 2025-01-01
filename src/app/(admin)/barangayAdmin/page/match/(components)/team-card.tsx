import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface TeamCardProps {
    id: string
    name: string
    isDragging?: boolean
}

export function TeamCard({ id, name, isDragging }: TeamCardProps) {
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
            className={`p-4 border rounded-lg shadow-sm cursor-move bg-background ${
                isDragging ? 'opacity-50' : ''
            }`}
        >
            {name}
        </div>
    )
}

