'use client'
import {ReactNode, useEffect, useState, useTransition} from "react";
import usePlayer from "@/hooks/use-player";
import {useRouter} from "next/navigation";
import Loading from "@/app/loading";
import {RootState} from "@/context/store";
import {useSelector} from "react-redux";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {updateLeagueMetadata} from "@/actions/playerActions";
import {PlayerLeagueMetaData} from "@/types/playerType";
import useAppToast from "@/hooks/use-appToast";
import {Input} from "@/components/ui/input";
import {useValidDocsImage} from "@/hooks/use-uploadImage";
import {Label} from "@/components/ui/label";
import {subscribeToNotifications} from "@/utils/supabase/realtime";

export default function PlayerOnboardProvider({children}:{children: ReactNode}) {
    const { player, isLoading } = usePlayer();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { league } = useSelector((state: RootState) => state.app);
    const { showToast } = useAppToast()
    const [isOpenDialog, setOpenDialog] = useState(false)
    const {handleFileChange, handleUploadImage} = useValidDocsImage();
    const [isJoining, startTransitionIsJoining] = useTransition()

    const handleJoinLeague = async () => {
        if(league){
            startTransitionIsJoining(async () => {
                const { imageUrl1, imageUrl2 } = await handleUploadImage();

                if(!imageUrl1 || !imageUrl2) {
                    showToast('Please provide','League Requirement','destructive')
                    return
                }
                const newLeagueMetadata: PlayerLeagueMetaData = {
                    leagueId: league.leagueId,
                    isAllowed: false,
                    requirements: {
                        residency: imageUrl1,
                        identityFile: imageUrl2
                    }
                }
                await updateLeagueMetadata(newLeagueMetadata,undefined)
                showToast("Wait","To approved by the barangay",'default')
                setOpenDialog(false)
            })
        }
    }

    useEffect(() => {
        if(league && player) {
            if(player.leagueMetadata?.leagueId != league.leagueId){
                setOpenDialog(true)
            }else{
                showToast('You already join','to this league','default')
            }
        }
    }, [league,player]);

    useEffect(() => {
        if (!isLoading && !player) {
            startTransition(() => {
                router.push('/onboard/player');
            });
        }
    }, [player, isLoading, router, startTransition]);

    if (isLoading) {
        return <Loading />;
    }

    if (isPending) {
        return <Loading text={'Getting you onboard!...'}/>;
    }

    if (!player) {
        return null;
    }

    const confirmJoinLeagueDialog = (
        <AlertDialog open={isOpenDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upload League Requirements</AlertDialogTitle>
                </AlertDialogHeader>

                <div className={'grid gap-4'}>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="file1">Upload Certificate of Residency (PDF, DOC, DOCX)</Label>
                        <Input id="file1" type={"file"} accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 1)}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="file2">Upload NSO or PSA Image (Image files only)</Label>
                        <Input id="file2" type={"file"} accept="image/*" onChange={(e) => handleFileChange(e, 2)}/>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpenDialog(false)} disabled={isJoining}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleJoinLeague} disabled={isJoining}>{isJoining ? 'Joining...' : 'Join'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

    return (
        <>
            {confirmJoinLeagueDialog}
            {children}
        </>
    )
}