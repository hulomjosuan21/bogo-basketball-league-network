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
import {ArrowUpRight, LoaderCircle, Search} from "lucide-react";
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
import useAppToast from "@/hooks/use-appToast";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import AppToolkit from "@/lib/app-toolkit";

export default function SearchComponent(){
    const router = useRouter()
    const {setEntity,handleSearch ,setName,isLoading} = useSearch();
    const [playersFound, setPlayersFound] = useState<Player[]>([])
    const [coachesFound, setCoachesFound] = useState<Coach[]>([])
    const [barangaysFound, setBarangaysFound] = useState<Barangay[]>([])
    const [foundEntity, setFoundEntity] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const { showToast } = useAppToast()

    const handleSearchClick = async () => {
        const { entity, players, coaches, barangays, empty } = await handleSearch()

        if(empty) {
            showToast('Enter name', null, 'default')
            return
        }

        setFoundEntity(entity)
        if (entity === RoleTypes.Player) {
            console.log(`Players: ${JSON.stringify(players, null, 2)}`)
            if(players.length > 0){
                setPlayersFound(players)
                setDialogOpen(true)
            }else{
                showToast('No player found', null, 'default')
            }
        }else if(entity === RoleTypes.Coach) {
            console.log(`Coaches: ${JSON.stringify(coaches, null, 2)}`)
            if(coaches.length > 0){
                setCoachesFound(coaches)
                setDialogOpen(true)
            }else{
                showToast('No coach found', null, 'default')
            }
        }else if(entity === RoleTypes.BarangayAdmin) {
            console.log(`Barangays: ${JSON.stringify(barangays, null, 2)}`)
            if(barangays.length > 0){
                setBarangaysFound(barangays)
                setDialogOpen(true)
            }else{
                showToast('No barangay found', null, 'default')
            }
        }
    }

    const handleRedirect = (path: string,id: string) => {
        router.push(`/view/${path}/${id}`)
    }

    const foundEntitiesDialog = (
        <AlertDialog open={dialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle/>
                </AlertDialogHeader>

                <div className={'flex flex-col'}>
                    {
                        foundEntity === RoleTypes.Player && (
                            <ScrollArea className="h-[300px]">
                                {
                                    playersFound.length > 0 ? playersFound.map((player, index) => (
                                        <div key={index}
                                             className={'flex items-center justify-between gap-4 mb-2 bg-secondary rounded-md p-2'}>
                                            <div className={'flex items-center gap-2'}>
                                                <Avatar>
                                                    <AvatarImage
                                                        src={AppToolkit.ImageWithFallBack(player.playerImage).toString()}/>
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <span>{AppToolkit.TextWithLimit(player.fullName,24)}</span>
                                            </div>
                                            <div>
                                                <Button variant={'outline'} size={'sm'}
                                                        onClick={() => handleRedirect(foundEntity, player.playerId)}>
                                                    <ArrowUpRight/>
                                                </Button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div
                                            className={'flex items-center justify-between gap-4 mb-2 bg-secondary rounded-md p-2'}>
                                            <span>No players found</span>
                                            <div>
                                                <Button variant={'outline'} size={'sm'} disabled={true}>
                                                    <ArrowUpRight/>
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
                                        <div key={index}
                                             className={'flex items-center justify-between gap-4 mb-2 bg-secondary rounded-md p-2'}>
                                            <div className={'flex items-center gap-2'}>
                                                <Avatar>
                                                    <AvatarImage src={AppToolkit.ImageWithFallBack(coach.coachImage).toString()}/>
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <span>{AppToolkit.TextWithLimit(coach.fullName,24)}</span>
                                            </div>
                                            <div>
                                            <Button variant={'outline'} size={'sm'}
                                                        onClick={() => handleRedirect(foundEntity, coach.coachId)}>
                                                    <ArrowUpRight/>
                                                </Button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div
                                            className={'flex items-center justify-between gap-4 mb-2 bg-secondary rounded-md p-2'}>
                                            <span>No coaches found</span>
                                            <div>
                                                <Button variant={'outline'} size={'sm'} disabled={true}>
                                                    <ArrowUpRight/>
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
                                            <div className={'flex items-center gap-2'}>
                                                <Avatar>
                                                    <AvatarImage src={AppToolkit.ImageWithFallBack(barangay.barangayImage).toString()}/>
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <span>{AppToolkit.TextWithLimit(barangay.barangayName,24)}</span>
                                            </div>
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
            <Input placeholder={'Search'} onChange={e => setName(e.target.value)} disabled={isLoading}/>
            <Select defaultValue={RoleTypes.Player} onValueChange={setEntity} disabled={isLoading}>
            <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Player" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={RoleTypes.Player}>Player</SelectItem>
                    <SelectItem value={RoleTypes.Coach}>Coach</SelectItem>
                    <SelectItem value={RoleTypes.BarangayAdmin}>Barangay</SelectItem>
                </SelectContent>
            </Select>

            <Button variant={'secondary'} onClick={handleSearchClick} disabled={isLoading}>{isLoading ? <LoaderCircle className={'animate-spin transition duration-75 ease-in'}/> : <Search className={'transition-opacity duration-75 ease-in-out'}/>}</Button>
        </div>
    )
}