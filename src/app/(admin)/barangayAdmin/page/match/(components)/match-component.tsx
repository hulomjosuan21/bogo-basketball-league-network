'use client'
import {useState, useTransition} from "react"
import {DndContext, DragEndEvent, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors,} from "@dnd-kit/core"
import {Button} from "@/components/ui/button"
import useAppToast from "@/hooks/use-appToast";
import League, {BracketType} from "@/types/leagueTypes";
import AppToolkit from "@/lib/app-toolkit";
import Loading from "@/app/loading";
import {addTeamToMatch, scheduleMatch} from "@/operations/matchOperation";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Match, MatchStatusType} from "@/types/matchType";
import {MatchUp, ToMatchTeam} from "@/app/(admin)/barangayAdmin/page/match/(types)/teamType";
import {TeamsList} from "@/app/(admin)/barangayAdmin/page/match/(components)/teams-list";
import {DropArea} from "@/app/(admin)/barangayAdmin/page/match/(components)/drop-area";
import {DraggingOverlay} from "@/app/(admin)/barangayAdmin/page/match/(components)/drag-overlay";
import {Badge} from "@/components/ui/badge";
import {updateMatchStatusAction} from "@/actions/matchActions";

type Props = {
    teams: ToMatchTeam[],
    league: League,
    matches: Match[]
}

export default function TournamentBracket({teams,league,matches}:Props) {
    const [isPending, startTransition] = useTransition()
    const { showToast } = useAppToast();
    const [matchUp, setMatchUp] = useState<MatchUp>({
        homeTeam: null,
        awayTeam: null,
    })
    const [activeId, setActiveId] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    )

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id.toString())
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        setActiveId(null)

        if (!over) return

        const draggedTeam = teams.find((team) => team.id === active.id)
        if (!draggedTeam) return

        if (
            (over.id === "home" && matchUp.awayTeam?.id === draggedTeam.id) ||
            (over.id === "away" && matchUp.homeTeam?.id === draggedTeam.id)
        ) {
            showToast('Error', 'Cannot use the same team for both positions', 'destructive');
            return
        }

        if (over.id === "home") {
            setMatchUp((prev) => ({ ...prev, homeTeam: draggedTeam }))
        } else if (over.id === "away") {
            setMatchUp((prev) => ({ ...prev, awayTeam: draggedTeam }))
        }
    }

    const handleScheduleFunction = async (homeTeam: ToMatchTeam,awayTeam: ToMatchTeam) => {
        const generateMatchId = AppToolkit.generateUid("bogo-basketball-league-network-match")

        let bracket: BracketType;
        if (homeTeam.bracket === awayTeam.bracket) {
            bracket = homeTeam.bracket;
        } else {
            bracket = BracketType.CROSSED;
        }

        await scheduleMatch({
            matchId: generateMatchId,
            date: new Date(),
            durationMinutes: 90,
            leagueId: league.leagueId,
            bracket: bracket,
            notes: "This is a test match",
        });

        await addTeamToMatch({
            matchId: generateMatchId,
            teamId: homeTeam.teamId,
            teamName: homeTeam.teamName,
        });

        await addTeamToMatch({
            matchId: generateMatchId,
            teamId: awayTeam.teamId,
            teamName: awayTeam.teamName,
        });
    }

    const handleSchedule = async () => {
        startTransition(async () => {
            if (matchUp.homeTeam && matchUp.awayTeam) {
                try{
                    await handleScheduleFunction(matchUp.homeTeam,matchUp.awayTeam)
                    showToast('Successfully matched!', `${matchUp.homeTeam.teamName} vs ${matchUp.awayTeam.teamName}`, 'default');
                    setMatchUp({ homeTeam: null, awayTeam: null });
                } catch (error) {
                    showToast('Error', AppToolkit.getErrorMessage(error), 'destructive');
                }
            }
        })
    }

    const handleClear = () => {
        setMatchUp({ homeTeam: null, awayTeam: null });
    };

    const handleCancelMatch = async (matchId: string) => {
        const { errorMessage } = await updateMatchStatusAction(matchId, MatchStatusType.CANCELLED)
        if(errorMessage){
            showToast('Error', errorMessage, 'destructive');
        }else{
            showToast('Success', 'Match has been cancelled', 'default');
        }
    }

    const activeDragTeam = activeId ? teams.find(team => team.id === activeId) : null

    const matchTable = () => {
        if(matches.length > 0){
           return (
               <Table className={'border-y'}>
                   <TableCaption>A list of match.</TableCaption>
                   <TableHeader>
                       <TableRow className={'bg-secondary'}>
                           <TableHead>Matched team</TableHead>
                           <TableHead>Bracket</TableHead>
                           <TableHead>Schedule date</TableHead>
                           <TableHead></TableHead>
                       </TableRow>
                   </TableHeader>
                   <TableBody>
                       {
                           matches.filter(m => m.status !== MatchStatusType.CANCELLED).map((match,index) => (
                               <TableRow key={index}>
                                   <TableCell className="font-medium">{match.matchedTeam[0].teamName} <span className={'text-orange-400'}>vs</span> {match.matchedTeam[1].teamName}</TableCell>
                                   <TableCell>
                                       <Badge variant={'secondary'}>
                                           {match.bracket.toUpperCase()}
                                       </Badge>
                                   </TableCell>
                                   <TableCell>
                                       {AppToolkit.dateFormatter(match.date,true)}
                                   </TableCell>
                                   <TableCell>
                                       <div className={'flex items-center gap-2 justify-end'}>
                                           <Button variant={'outline'} size={'sm'} onClick={() => handleCancelMatch(match.matchId)}>Cancel</Button>
                                           <Button size={'sm'}>Start</Button>
                                       </div>
                                   </TableCell>
                               </TableRow>
                           ))
                       }
                   </TableBody>
               </Table>
           )
        }else{
            return (
                <div className={'text-center mt-4'}>
                    No match scheduled
                </div>
            )
        }
    }

    function getTeamList() {
        return (
            <>
                <TeamsList
                    title="Higher Bracket Teams"
                    teams={teams.filter((team) => team.bracket === BracketType.HIGHER)}
                    activeId={activeId}
                />
                <TeamsList
                    title="Lower Bracket Teams"
                    teams={teams.filter((team) => team.bracket === BracketType.LOWER)}
                    activeId={activeId}
                />
                {
                    teams.filter((team) => team.bracket === BracketType.CROSSED).length > 0 && (
                        <TeamsList
                            title="Lower Bracket Teams"
                            teams={teams.filter((team) => team.bracket === BracketType.CROSSED)}
                            activeId={activeId}
                        />
                    )
                }
            </>
        )
    }

    if(isPending) {
        return <Loading text={'Scheduling match...'} height={'h-[calc(100vh-80px)]'}/>
    }

    return (
        <div className="min-h-[100vh-50px] flex flex-col items-center">
            <div className={'w-full p-4'}>
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="relative">

                        <div className="">
                            <div className="space-y-8">
                                <div className="grid gap-4 md:grid-cols-2 md:gap-8">
                                    <DropArea
                                        id="home"
                                        title="Home Team Drag Area"
                                        team={matchUp.homeTeam}
                                    />
                                    <DropArea
                                        id="away"
                                        title="Away Team Drag Area"
                                        team={matchUp.awayTeam}
                                    />
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <span className="text-2xl font-bold">VS</span>
                                    <div className="flex gap-4 border-t w-full justify-center p-2">
                                        <Button
                                            onClick={handleSchedule}
                                            disabled={!matchUp.homeTeam || !matchUp.awayTeam}
                                            className={''}
                                        >
                                            {(!matchUp.homeTeam || !matchUp.awayTeam) ? 'Select Teams' : 'Schedule match'}
                                        </Button>

                                        <Button onClick={handleClear} variant="outline" disabled={!matchUp.homeTeam || !matchUp.awayTeam}>Clear</Button>

                                    </div>

                                    <div
                                        className="rounded-lg border w-full p-4 flex items-center flex-wrap justify-center gap-4">
                                        {getTeamList()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DraggingOverlay name={activeDragTeam?.teamName ?? null} teamImage={activeDragTeam?.teamImage ?? null}/>
                </DndContext>
            </div>

            <div className={'w-full'}>
                {matchTable()}
            </div>
        </div>
    )
}

