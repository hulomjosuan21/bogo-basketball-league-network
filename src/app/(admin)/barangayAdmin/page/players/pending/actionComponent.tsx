'use client'
import {Button} from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {useState, useTransition} from "react";
import {Player, PlayerLeagueMetaData} from "@/types/playerType";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image"
import AppToolkit from "@/lib/app-toolkit";
import Link from "next/link";
import {updateLeagueMetadata} from "@/actions/playerActions";
import useAppToast from "@/hooks/use-appToast";
import {deleteImage} from "@/utils/supabase/server";
import {sendSmsAction} from "@/actions/sendSmsActions";
import {useRouter} from "next/navigation";

type Props = {
    player: Player
}

export default function CheckPlayerButton({player}:Props){
    const { showToast } = useAppToast()
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const handleReject = async () => {
        startTransition(async () => {
            await updateLeagueMetadata(null,player.playerId);
            showToast(`Player ${player.fullName}`,'Rejected Successfully','default')
            if(player.leagueMetadata){
                await deleteImage(player.leagueMetadata?.requirements.residency)
                await deleteImage(player.leagueMetadata?.requirements.identityFile)
            }
            setIsOpen(false)
        })
    }

    const handleRejectApprove = async () => {
        startTransition(async () => {

            if(!player.leagueMetadata) {
                return;
            }
            const temp: PlayerLeagueMetaData = {
                ...player.leagueMetadata,
                isAllowed: true
            }
            await updateLeagueMetadata(temp,player.playerId)
            showToast(`Player ${player.fullName}`,'Approved Successfully','default')
            await sendSmsAction(player.phoneNumber,"You have been successfully registered to league");
            setIsOpen(false)
        })
    }

    const filesElement = (
        <div className={'flex flex-col items-center gap-4'}>
            <div>
                <Button size={'sm'} asChild={true} variant={'link'}>
                    <Link href={`${player.leagueMetadata?.requirements.residency}`} target={'_blank'}>
                        Download Residency
                    </Link>
                </Button>
            </div>

            <div>Player NSO//PSA</div>
            <div className="w-[180px]">
                <AspectRatio ratio={9 / 16}>
                    <Link href={`${player.leagueMetadata?.requirements.identityFile}`} target={'_blank'}>
                        <Image src={AppToolkit.ImageWithFallBack(player.leagueMetadata?.requirements.identityFile)} alt="Image" className="rounded-md object-cover" fill={true}/>
                    </Link>
                </AspectRatio>
            </div>
        </div>
    )

    const checkPlayerDialog = (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle/>
                </AlertDialogHeader>

                <div>
                    {
                        player.leagueMetadata && (
                            filesElement
                        )
                    }
                </div>

                <AlertDialogFooter className={'gap-2'}>
                    <Button variant={'ghost'} onClick={() => setIsOpen(false)} disabled={isPending}>Cancel</Button>
                    <Button variant={'destructive'} onClick={handleReject} disabled={isPending}>Reject</Button>
                    <Button onClick={handleRejectApprove} disabled={isPending}>Approve</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

    if(!player) {
        return null
    }

    return (
        <>
            {checkPlayerDialog}
            <Button size={'sm'} onClick={() => setIsOpen(true)}>Check</Button>
        </>
    )
}