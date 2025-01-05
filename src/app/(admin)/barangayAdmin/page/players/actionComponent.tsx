'use client'
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {updateLeagueMetadata} from "@/actions/playerActions";
import {deleteImage} from "@/utils/supabase/server";
import {Player, PlayerLeagueMetaData} from "@/types/playerType";
import useAppToast from "@/hooks/use-appToast";
import {useTransition} from "react";
import {LoaderCircle} from "lucide-react";
import {sendSmsAction} from "@/actions/sendSmsActions";

type Props = {
    player: Player
}

export default function IncludedPlayerButton({player}:Props){
    const { showToast } = useAppToast()
    const [isPending, startTransition] = useTransition()

    if(!player) {
        throw new Error("No player found!")
    }

    const handleRemoveTemporary = async () => {
        startTransition(async () => {

            if(!player.leagueMetadata) {
                return;
            }
            const temp: PlayerLeagueMetaData = {
                ...player.leagueMetadata,
                isAllowed: false
            }
            await updateLeagueMetadata(temp,player.playerId)
            showToast(`Player ${player.fullName}`,'Approved Successfully','default')
            await sendSmsAction(player.phoneNumber,"You have been successfully registered to league");
        })
    }

    const handleRemovePermanent = async () => {
        startTransition(async () => {
            await updateLeagueMetadata(null,player.playerId);
            showToast(`Player ${player.fullName}`,'Removed Successfully','default')
            if(player.leagueMetadata){
                await deleteImage(player.leagueMetadata?.requirements.residency)
                await deleteImage(player.leagueMetadata?.requirements.identityFile)
            }
        })
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild={true}>
                    <Button size={'sm'} disabled={isPending}>{isPending ? <LoaderCircle className={'animate-spin ease-in'}/> : 'Manage'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'mr-2'}>
                    <DropdownMenuItem onClick={handleRemoveTemporary}>Remove</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleRemovePermanent}>Remove Permanently</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}