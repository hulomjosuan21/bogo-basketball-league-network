'use client'
import Team from "@/types/teamType"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import AppToolkit from "@/lib/app-toolkit";
import CoachTeamAction from "@/app/(entities)/coach/page/team/coachTeamAction";
import {useSelector} from "react-redux";
import {RootState} from "@/context/store";
import {Button} from "@/components/ui/button";
import {useTransition} from "react";
import {addLeagueIdAction} from "@/actions/teamActions";
import useAppToast from "@/hooks/use-appToast";

type Props = {
    teams: Team[],
}

export default function TeamManagerTeamTable({teams}:Props){
    const { league } = useSelector((state: RootState) => state.app);
    const [isJoining, startTransitionJoining] = useTransition()
    const { showToast } = useAppToast();

    const handleJoinLeague = async (team: Team) => {
        startTransitionJoining(async () => {
            try{
                if(league){
                    const {errorMessage} = await addLeagueIdAction(team, league.leagueId);

                    if(errorMessage){
                        throw new Error(errorMessage)
                    }else{
                        showToast('Successfully joined league!', null, 'default');
                    }
                }else{
                    showToast('Failed to join league!', 'No league found!', 'destructive');
                }
            }catch (error){
                showToast('Failed to join league!', AppToolkit.getErrorMessage(error), 'destructive');
}
        })
    }

    return (
        <div className={'border rounded-none w-full max-w-4xl sm:rounded-md'}>
            <Table>
                <TableCaption>A list of your teams.</TableCaption>
                <TableHeader>
                    <TableRow className={'bg-secondary'}>
                        <TableHead>Team name</TableHead>
                        <TableHead className={'text-end'}>{league && `Select team to join in league ${league.leagueName}`}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        teams.map((team, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className={'flex gap-2 items-center justify-start'}>
                                        <div className="w-[50px] my-1">
                                            <AspectRatio ratio={1}>
                                                <Image src={AppToolkit.ImageWithFallBack(team.teamImage)} alt="Image"
                                                       className="rounded-md object-cover" fill={true}/>
                                            </AspectRatio>
                                        </div>
                                        {team.teamName}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className={'flex items-center justify-end gap-2'}>
                                        <CoachTeamAction team={team} coachTeam={teams}/>
                                        {
                                            league && (
                                                <Button variant={'outline'} size={'sm'} onClick={() => handleJoinLeague(team)} disabled={isJoining}>{isJoining ? 'Joining...' : 'Join'}</Button>
                                            )
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}