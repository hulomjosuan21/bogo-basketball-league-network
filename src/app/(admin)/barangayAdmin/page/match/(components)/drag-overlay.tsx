import { DragOverlay } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

interface DraggingOverlayProps {
    name: string | null
}

export function DraggingOverlay({ name }: DraggingOverlayProps) {
    if (!name) return null

    return (
        <DragOverlay dropAnimation={null}>
            <div
                className="p-4 bg-s border rounded-lg shadow-lg cursor-grabbing"
                style={{
                    transform: CSS.Transform.toString({
                        x: 0,
                        y: 0,
                        scaleX: 1.05,
                        scaleY: 1.05,
                    }),
                }}
            >
                {name}
            </div>
        </DragOverlay>
    )
}

