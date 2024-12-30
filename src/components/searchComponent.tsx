'use client'
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {ArrowUpRight, Search} from "lucide-react";
import RoleTypes from "@/types/roleTypes";
import useSearch from "@/hooks/use-search";
import {useState} from "react";
import {Player} from "@/types/playerType";
import Coach from "@/types/coachType";
import Barangay from "@/types/barangayType";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {ScrollArea} from "@/components/ui/scroll-area";
import {useRouter} from "next/navigation";

export default function SearchComponent(){
    const router = useRouter()
    const {setEntity,handleSearch ,setName} = useSearch();
    const [playersFound, setPlayersFound] = useState<Player[]>([])
    const [coachesFound, setCoachesFound] = useState<Coach[]>([])
    const [barangaysFound, setBarangaysFound] = useState<Barangay[]>([])
    const [foundEntity, setFoundEntity] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleSearchClick = async () => {
        const { entity, players, coaches, barangays } = await handleSearch()
        setFoundEntity(entity)
        if (entity === RoleTypes.Player) {
            console.log(`Players: ${JSON.stringify(players, null, 2)}`)
            setPlayersFound(players)
            setDialogOpen(true)
        }else if(entity === RoleTypes.Coach) {
            console.log(`Coaches: ${JSON.stringify(coaches, null, 2)}`)
            setCoachesFound(coaches)
            setDialogOpen(true)
        }else if(entity === RoleTypes.BarangayAdmin) {
            console.log(`Barangays: ${JSON.stringify(barangays, null, 2)}`)
            setBarangaysFound(barangays)
            setDialogOpen(true)
        }
    }

    const handleRedirect = (path: string,id: string) => {
        router.push(`/view/${path}/${id}`)
    }

    const foundEntitiesDialog = (
        <AlertDialog open={dialogOpen}>
            <AlertDialogContent>

                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {playersFound.length > 0 || coachesFound.length > 0 || barangaysFound.length > 0 ? 'Found' : 'No found'} {foundEntity === RoleTypes.Player ? 'Player' : foundEntity === RoleTypes.Coach ? 'Coach' : 'Barangay'}
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <div className={'flex flex-col'}>
                    {
                        foundEntity === RoleTypes.Player && (
                            <ScrollArea className="h-[300px]">
                                {
                                    playersFound.length > 0 ? playersFound.map((player, index) => (
                                        <div key={index} className={'flex items-center justify-between gap-4 mb-2 bg-secondary rounded-md p-2'}>
                                            <span>{player.fullName}</span>
                                            <div>
                                                <Button variant={'outline'} size={'sm'} onClick={() => handleRedirect(foundEntity, player.playerId)}>
                                                    <ArrowUpRight />
                                                </Button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className={'flex items-center justify-between gap-4 mb-2 bg-secondary rounded-md p-2'}>
                                            <span>No players found</span>
                                            <div>
                                                <Button variant={'outline'} size={'sm'} disabled={true}>
                                                    <ArrowUpRight />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                }
                            </ScrollArea>
                        )
                    }

                    {
                        foundEntity === RoleTypes.Coach && (
                            <ScrollArea className="h-[300px]">
                                {
                                    coachesFound.length > 0 ? coachesFound.map((coach, index) => (
                                        <div key={index} className={'flex items-center justify-between gap-4 mb-2 bg-secondary rounded-md p-2'}>
                                            <span>{coach.fullName}</span>
                                            <div>
                                                <Button variant={'outline'} size={'sm'} onClick={() => handleRedirect(foundEntity, coach.coachId)}>
                                                    <ArrowUpRight />
                                                </Button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className={'flex items-center justify-between gap-4 mb-2 bg-secondary rounded-md p-2'}>
                                            <span>No coaches found</span>
                                            <div>
                                                <Button variant={'outline'} size={'sm'} disabled={true}>
                                                    <ArrowUpRight />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                }
                            </ScrollArea>
                        )
                    }

                    {
                        foundEntity === RoleTypes.BarangayAdmin && (
                            <ScrollArea className="h-[300px]">
                                {
                                    barangaysFound.length > 0 ? barangaysFound.map((barangay, index) => (
                                        <div key={index} className={'flex items-center justify-between gap-4 mb-2 bg-secondary rounded-md p-2'}>
                                            <span>{barangay.barangayName}</span>
                                            <div>
                                                <Button variant={'outline'} size={'sm'} onClick={() => handleRedirect('barangay', barangay.barangayId)}>
                                                    <ArrowUpRight />
                                                </Button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className={'flex items-center justify-between gap-4 mb-2 bg-secondary rounded-md p-2'}>
                                            <span>No barangays found</span>
                                            <div>
                                                <Button variant={'outline'} size={'sm'} disabled={true}>
                                                    <ArrowUpRight />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                }
                            </ScrollArea>
                        )
                    }
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )

    return (
        <div className={'flex items-center gap-4'}>
            {foundEntitiesDialog}
            <Input placeholder={'Search'} onChange={e => setName(e.target.value)}/>
            <Select defaultValue={RoleTypes.Player} onValueChange={setEntity}>
            <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Player" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={RoleTypes.Player}>Player</SelectItem>
                    <SelectItem value={RoleTypes.Coach}>Coach</SelectItem>
                    <SelectItem value={RoleTypes.BarangayAdmin}>Barangay</SelectItem>
                </SelectContent>
            </Select>

            <Button variant={'secondary'} onClick={handleSearchClick}><Search/></Button>
        </div>
    )
}