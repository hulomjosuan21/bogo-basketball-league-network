'use client'
import Team from "@/types/teamType";
import {useSelector} from "react-redux";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {RootState} from "@/context/store";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image"
import AppToolkit from "@/lib/app-toolkit";
import {Button} from "@/components/ui/button";
import {useEffect, useState, useTransition} from "react";

import useAppToast from "@/hooks/use-appToast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {addLeagueIdAction} from "@/actions/teamActions";
import Link from "next/link";

type Props = {
    team: Team
}

export default function TeamCard({team}:Props){
    const { league } = useSelector((state: RootState) => state.app)
    const { showToast } = useAppToast()
    const [isOpen,setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const cardClick = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        if (league) {
            showToast("Select Team", `To submit in league ${league.leagueName}`, "default");
        }
    }, []);

    const handleSubmitTeam = async () => {
        startTransition(async () => {
            if(league){
                const {errorMessage} = await addLeagueIdAction(team,league.leagueId)
                if(errorMessage) {
                    showToast("Error",errorMessage,'destructive')
                    setIsOpen(false)
                }else{
                    showToast("Successfully submit team","Wait for the Barangay admin to approve team submission",'default')
                    setIsOpen(false)
                }
            }
        })
    }

    const submitDialog = (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{team.teamName}</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure to submit this team to League {league?.leagueName}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmitTeam} disabled={isPending}>{isPending ? 'Submitting...' : 'Submit'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

    return (
        <div>
            {submitDialog}
            <Card>
                <CardHeader>
                    <CardTitle/>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="w-[250px]">
                            <AspectRatio ratio={1}>
                                <Link href={`${team.teamImage}`}  target={'_blank'}>
                                    <Image src={AppToolkit.ImageWithFallBack(team.teamImage)} alt="Image" className="rounded-md object-cover" fill={true}/>
                                </Link>
                            </AspectRatio>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className={'flex flex-col items-center gap-2'}>
                    <p className="whitespace-nowrap w-[250px] overflow-x-auto font-semibold">{team.teamName}</p>
                    <div className={'flex items-center justify-center gap-2'}>
                        {
                            league && (
                                <Button size={'sm'} onClick={cardClick}>Submit Team</Button>
                            )
                        }
                        <Button size={'sm'} variant={'secondary'}>View Team</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>

    )
}