import { ScrollArea } from "@/components/ui/scroll-area"
import { TeamCard } from "./team-card"
import {ToMatchTeam} from "@/app/(admin)/barangayAdmin/page/match/(types)/teamType";

interface TeamsListProps {
    title: string
    teams: ToMatchTeam[]
    activeId: string | null
}

export function TeamsList({ title, teams, activeId }: TeamsListProps) {
    return (
        <div className="w-full max-w-sm">
            <h2 className="text-md font-semibold text-center">{title}</h2>
            <ScrollArea className="h-[300px] z-10 border p-4 bg-b bg-secondary rounded mt-4">
                <div className="space-y-4">
                    {teams.map((team) => (
                        <TeamCard
                            key={team.id}
                            id={team.id}
                            name={team.teamName}
                            isDragging={activeId === team.id}
                            teamImage={team.teamImage}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

