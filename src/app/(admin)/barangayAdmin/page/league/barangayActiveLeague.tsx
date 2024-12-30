'use client'
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import League, {LEAGUE_STATUS} from "@/types/leagueTypes";
import {Input} from "@/components/ui/input";
import {useState, useTransition} from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {updateLeagueAction, updateLeagueStatusAction} from "@/actions/leagueActions";
import useAppToast from "@/hooks/use-appToast";

export default function BarangayActiveLeague({activeLeague}: { activeLeague: League }){
    const [dialogOpen, setDialogOpen] = useState(false)
    const [newLeagueName, setNewLeagueName] = useState('')
    const {showToast} = useAppToast()
    const [isPendingStatus, startTransitionStatus] = useTransition()
    const [isPendingRename, startTransitionRename] = useTransition()
    const handleRename = async () => {
        startTransitionRename(async () => {
            const { errorMessage} = await updateLeagueAction(activeLeague, {leagueName: newLeagueName})
            if(errorMessage){
                showToast('Failed to update league', errorMessage, 'destructive')
            }else{
                showToast('League updated', `League renamed to ${newLeagueName}`, 'default')
            }
        })
    }

    const handleSetStatus = async (status: LEAGUE_STATUS) => {
        startTransitionStatus(async () => {
            const { errorMessage} = await updateLeagueStatusAction(activeLeague, status)
            if(errorMessage){
                showToast('Failed to update league status', errorMessage, 'destructive')
            }else{
                showToast('League status updated', `League status has been set to ${status}`, 'default')
            }
        })
    }


    return (
        <div className={'flex-1 bg-secondary px-4 py-2 rounded-md flex justify-between items-center'}>

            <div>
                <span className={'font-semibold text-sm mr-2'}>{activeLeague.leagueName}</span> <Badge>{activeLeague.status}</Badge>
            </div>
            <Button size={'sm'} variant={'outline'} onClick={() => setDialogOpen(true)}>Manage</Button>

            <AlertDialog open={dialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className={'flex items-center gap-4'}>
                        <Input placeholder={activeLeague.leagueName} onChange={e => setNewLeagueName(e.target.value)}/>
                        <Button variant={'secondary'} onClick={handleRename} disabled={isPendingRename}>{isPendingRename ? 'Renaming...' : 'Rename'}</Button>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialogOpen(false)}>Close</AlertDialogCancel>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild={true}>
                                <Button disabled={isPendingStatus}>{isPendingStatus ? 'Updating status...' : 'Set status'}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleSetStatus(LEAGUE_STATUS.ONGOING)}>Start</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSetStatus(LEAGUE_STATUS.COMPLETED)}>Complete</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSetStatus(LEAGUE_STATUS.CANCELED)}>Cancel</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}