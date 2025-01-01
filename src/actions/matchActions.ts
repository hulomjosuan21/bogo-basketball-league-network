'use server'

import {matchesTable} from "@/db/schemas/matchTable";
import {createClient} from "@/utils/supabase/server";
import {Match, MatchStatusType, MatchTeam} from "@/types/matchType";
import AppToolkit from "@/lib/app-toolkit";
import {revalidatePath} from "next/cache";

export async function getAllMatchByIds(column: keyof typeof matchesTable, id: string) {
    const supabase = await createClient();

    const { data: matchesData, error: matchesError } = await supabase
        .from('matchesTable')
        .select()
        .eq(column, id);

    if (matchesError) {
        throw new Error(matchesError.message);
    }

    if (!matchesData) {
        return { matches: [] as Match[] };
    }

    const matchIds = matchesData.map(match => match.matchId);

    const { data: matchesTeamsData, error: matchesTeamsError } = await supabase
        .from('matchTeamsTable')
        .select()
        .in('matchId', matchIds);

    if (matchesTeamsError) {
        throw new Error(matchesTeamsError.message);
    }

    const matches: Match[] = matchesData.map(match => ({
        id: match.id,
        matchId: match.matchId,
        date: new Date(match.date),
        durationMinutes: match.duration_minutes,
        location: match.location,
        leagueId: match.leagueId,
        bracket: match.bracket,
        notes: match.notes,
        status: match.status,
        statistics: match.statistics,
        matchedTeam: matchesTeamsData
            .filter(team => team.matchId === match.matchId)
            .map(team => ({
                id: team.id,
                matchId: team.matchId,
                teamId: team.teamId,
                teamName: team.teamName,
                score: team.score,
                status: team.status,
                subStatus: team.subStatus,
                gamesPlayed: team.gamesPlayed,
                gamesWon: team.gamesWon,
                gamesLost: team.gamesLost,
            } as MatchTeam)),
    }));

    return { matches };
}

export async function updateMatchStatusAction(matchId: string, newStatus: MatchStatusType) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('matchesTable')
        .update({ status: newStatus })
        .eq('matchId', matchId);

    if (error) {
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }else{
        revalidatePath('/barangayAdmin/page/match')
    }

    return { errorMessage: null }
}