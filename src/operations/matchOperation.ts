'use server'

import {and, eq} from "drizzle-orm";
import {db} from "@/db/database";
import {InsertMatchTeamType, InsertMatchType, matchesTable, matchTeamsTable} from "@/db/schemas/matchTable";
import AppToolkit from "@/lib/app-toolkit";

export const scheduleMatchOperation = async (matchData: Partial<InsertMatchType>) => {
    try {
        await db.insert(matchesTable).values(matchData as InsertMatchType)
    } catch (error) {
        throw new Error(AppToolkit.getErrorMessage(error));
    }
};

export const startMatchOperation = async (matchId: string) => {
    try{
        await db
            .update(matchesTable)
            .set({ status: "ONGOING" })
            .where(eq(matchesTable.matchId, matchId))
    } catch (error) {
        throw new Error(AppToolkit.getErrorMessage(error));
    }
};

export const completeMatchOperation = async (matchId: string, statistics: Record<string, unknown>) => {
    try {
        await db
            .update(matchesTable)
            .set({ status: "COMPLETED", statistics })
            .where(eq(matchesTable.matchId, matchId))
    } catch (error) {
        throw new Error(AppToolkit.getErrorMessage(error));
    }
};

export const addTeamToMatchOperation = async (teamData: Partial<InsertMatchTeamType>) => {
    try{
        await db.insert(matchTeamsTable).values(teamData as InsertMatchTeamType)
    } catch (error) {
        throw new Error(AppToolkit.getErrorMessage(error));
    }
};

export const updateTeamScoreOperation = async (matchId: string, teamId: string, score: number) => {
    try{
        await db
            .update(matchTeamsTable)
            .set({ score })
            .where(and(eq(matchTeamsTable.matchId, matchId), eq(matchTeamsTable.teamId, teamId)))
    } catch (error) {
        throw new Error(AppToolkit.getErrorMessage(error));
    }
};

export const finalizeTeamStatsOperation = async (
    matchId: string,
    teamId: string,
    stats: { gamesPlayed: number; gamesWon: number; gamesLost: number }
) => {
    try {
        await db
            .update(matchTeamsTable)
            .set(stats)
            .where(and(eq(matchTeamsTable.matchId, matchId), eq(matchTeamsTable.teamId, teamId)))
    } catch (error) {
        throw new Error(AppToolkit.getErrorMessage(error));
    }
};

export class MatchManager {
    static async scheduleMatch(matchData: Partial<InsertMatchType>) {
        await scheduleMatchOperation(matchData);
    }

    static async startMatch(matchId: string) {
        await startMatchOperation(matchId);
    }

    static async completeMatch(matchId: string, statistics: Record<string, unknown>) {
        await completeMatchOperation(matchId, statistics);
    }

    static async addTeamToMatch(teamData: Partial<InsertMatchTeamType>) {
        await addTeamToMatchOperation(teamData);
    }

    static async updateTeamScore(matchId: string, teamId: string, score: number) {
        await updateTeamScoreOperation(matchId, teamId, score);
    }

    static async finalizeTeamStats(
        matchId: string,
        teamId: string,
        stats: { gamesPlayed: number; gamesWon: number; gamesLost: number }
    ) {
        await finalizeTeamStatsOperation(matchId, teamId, stats);
    }
}
