'use client'
import Team from "@/types/teamType";
import {Button} from "@/components/ui/button";
import {Plus, X} from "lucide-react";
import useAppToast from "@/hooks/use-appToast";
import {useState, useTransition} from "react";
import {removeLeagueIdAction, setBracketForLeagueAction, updateLeagueTeamIdAction} from "@/actions/teamActions";
import League, {BracketType} from "@/types/leagueTypes";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {TeamBracketAssigner} from "@/utils/teamBracketAssigner";
import AppToolkit from "@/lib/app-toolkit";

type Props = {
    team: Team,
    league: League,
}

export function IncludeTeamActionComponent({team,league}:Props){
    const { showToast } = useAppToast();
    const [isLoading, setIsLoading] = useState(false);

    async function handleIncludeTeam() {
        setIsLoading(true);
        const {errorMessage} = await updateLeagueTeamIdAction(team, league.leagueId, true);
        if(errorMessage){
            showToast('Error', errorMessage, 'destructive');
        }else{
            showToast('Success', 'Team included successfully', 'default');
        }
        setIsLoading(false);
    }

    async function handleRemoveTeam() {
        setIsLoading(true);
        const {errorMessage} = await removeLeagueIdAction(team, league.leagueId);
        if(errorMessage){
            showToast('Error', errorMessage, 'destructive');
        }else{
            showToast('Success', 'Team removed successfully', 'default');
        }
        setIsLoading(false);
    }

    return (
        <div className={'flex items-center gap-2'}>
            <Button size={'sm'} variant={'ghost'} onClick={handleRemoveTeam} disabled={isLoading}>
                <X />
            </Button>
            <Button size={'sm'} variant={'outline'} onClick={handleIncludeTeam} disabled={isLoading}>
                <Plus />
            </Button>
        </div>
    )
}


export function SetBracketActionComponent({team,league}: Props){
    const { showToast } = useAppToast();

    const handleSetBracket = async (bracketType: BracketType) => {
        const {errorMessage} = await setBracketForLeagueAction(team, league.leagueId, bracketType);
        if(errorMessage){
            showToast('Error', errorMessage, 'destructive');
        }else{
            showToast('Success', 'Bracket set successfully', 'default');
        }
    }

    return (
        <div className={'flex items-center justify-end'}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild={true}>
                    <Button size={'sm'} variant={'outline'}>Set</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'mr-4'}>
                    <DropdownMenuItem onClick={() => handleSetBracket(BracketType.HIGHER)}>Higher bracket</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSetBracket(BracketType.LOWER)}>Lower bracket</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default function GenerateBracketTeamAutomatically({teams,currentLeague}:{teams: Team[],currentLeague: League}){
    const [isPending, startTransition] = useTransition()
    const { showToast } = useAppToast();

    const handleGenerateBracket = async () => {
        startTransition(async () => {
            try {
                const teamBracketAssigner = new TeamBracketAssigner(teams, currentLeague.leagueId);
                await teamBracketAssigner.assignBrackets();
            } catch (error) {
                showToast('Error', AppToolkit.getErrorMessage(error), 'destructive');
            }
        })
    }

    return (
        <Button variant={'secondary'} onClick={handleGenerateBracket} disabled={isPending}>{isPending ? 'Generating...' : 'Generate bracket automatically'}</Button>
    )
}