'use client'
import {Button} from "@/components/ui/button";
import Team from "@/types/teamType";
import {useState, useTransition} from "react";
import {addPlayerAction, deleteTeamById, removePlayerAction} from "@/actions/teamActions";
import useAppToast from "@/hooks/use-appToast";
import {deleteImage} from "@/utils/supabase/server";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import {Input} from "@/components/ui/input";
import {Player} from "@/types/playerType";
import {getPlayersDataWhere} from "@/actions/playerActions";
import {ScrollArea} from "@/components/ui/scroll-area";
import {LoaderCircle} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useTeamPlayer from "@/hooks/use-teamPlayer";


type Props = {
    team: Team,
    coachTeam: Team[]
}

export default function CoachTeamAction({team,coachTeam}:Props){
    const { showToast} = useAppToast();
    const [searchedPlayers, setPlayers] = useState<Player[]>([]);
    const [fullName, setFullName] = useState('');
    const [sheetOpen1, setSheetOpen1] = useState(false)
    const [sheetOpen2, setSheetOpen2] = useState(false)
    console.log(`Coach team from actions ${JSON.stringify(coachTeam,null,2)}`);
    const { teamPlayers: playersInTheTeam } = useTeamPlayer(team)

    if(!team){
        throw Error('Team is required')
    }

    const handleSearch =  async () => {
        const {players} = await getPlayersDataWhere('fullName',`${fullName}%`);
        console.log(`Found ${JSON.stringify(players,null,2)}`);
        setPlayers(players);
    }

    const [isUpdating, startTransitionUpdating] = useTransition()
    const [isAdding, startTransitionAdding] = useTransition()
    const [isRemoving, startTransitionRemoving] = useTransition()

    const handleAddPlayer = async (playerId: string) => {
        startTransitionAdding(async () => {
            const {errorMessage} = await addPlayerAction(team,playerId);
            if(errorMessage){
                showToast("Failed to add player", errorMessage, 'destructive')
            }else {
                showToast("Player added successfully", null, 'default')
                setSheetOpen1(false)
            }
        })
    }

    const handleRemovePlayer = async (playerId: string) => {
        startTransitionRemoving(async () => {
            const {errorMessage} = await removePlayerAction(team,playerId);
            if(errorMessage){
                showToast("Failed to remove player", errorMessage, 'destructive')
            }else {
                showToast("Player remove successfully", null, 'default')
                setSheetOpen2(false)
            }
        })
    }

    const handleUpdate = async () => {
        startTransitionUpdating(async () => {

        })
    }

    const [isDeleting, startTransitionDeleting] = useTransition()

    const handleDelete = async () => {
        startTransitionDeleting(async () => {
            const {errorMessage} = await deleteTeamById(team.teamId);
            await deleteImage(team.teamImage as string);
            if(errorMessage){
                showToast("Failed to delete team", errorMessage, 'destructive')
            }else{
                showToast("Team deleted successfully", null, 'default')
            }
        })
    }

    const searchedPlayer = (
        <div className={''}>
            <ScrollArea className="h-[400px] border rounded px-4 py-1">
                {
                    searchedPlayers.map((player, index) => (
                        <div key={index} className={'flex items-center gap-2 justify-between mb-2'}>
                            <Input value={player.fullName} disabled={true} className={''}/>
                            <Button
                                size={'sm'}
                                onClick={() => handleAddPlayer(player.id)}
                                disabled={isAdding}>
                                {isAdding ? <LoaderCircle className={'animate-spin icon-sm'}/> : 'Add'}
                            </Button>
                        </div>
                    ))
                }
            </ScrollArea>
        </div>
    )

    const teamPlayers = (
        <div className={''}>
            <ScrollArea className="h-[400px] border rounded px-4 py-1">
                {
                    playersInTheTeam.map((player, index) => (
                        <div key={index} className={'flex items-center gap-2 justify-between mb-2'}>
                            <Input value={player.fullName} disabled={true} className={''}/>
                            <Button
                                variant={'destructive'}
                                size={'sm'}
                                disabled={isRemoving}
                                onClick={() => handleRemovePlayer(player.id)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))
                }
            </ScrollArea>
        </div>
    )

    return (
        <div className={'flex gap-4 items-center justify-end'}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild={true}>
                    <Button size={'sm'}>Manage</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSheetOpen1(true)}>Add Player</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleUpdate}> {isUpdating ? 'Updating...' : 'Edit'}</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>{isDeleting ? 'Deleting...' : 'Delete'}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSheetOpen2(true)}>View Players</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Sheet open={sheetOpen1}>
                <SheetContent side={'right'} className={'overflow-hidden'} >
                    <SheetHeader className={'bg-background absolute top-0 w-full py-4 flex justify-start gap-2 items-center flex-row'}>
                        <Button variant={'secondary'} size={'sm'} onClick={() => setSheetOpen1(false)}>Close</Button>
                        <SheetTitle className={'hidden'}>Add Players</SheetTitle>
                    </SheetHeader>

                    <div className={'mt-12 flex items-center gap-2'}>
                        <Input placeholder={'Player name'} onChange={e => setFullName(e.target.value)}/>
                        <Button onClick={handleSearch}>Search</Button>
                    </div>

                    <div className={'flex flex-col gap-2 mt-4'}>
                        {searchedPlayer}
                    </div>
                </SheetContent>
            </Sheet>


            <Sheet open={sheetOpen2}>
                <SheetContent side={'left'} className={'overflow-hidden'} >
                    <SheetHeader className={'bg-background absolute top-0 w-full py-4 flex justify-start gap-2 items-center flex-row'}>
                        <Button variant={'secondary'} size={'sm'} onClick={() => setSheetOpen2(false)}>Close</Button>
                        <SheetTitle className={'hidden'}>Add Players</SheetTitle>
                    </SheetHeader>

                    <div className={'mt-12 flex flex-col gap-2'}>
                        {teamPlayers}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}