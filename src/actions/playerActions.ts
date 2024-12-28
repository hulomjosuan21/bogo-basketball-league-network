'use server'
import {
    InsertPlayerLeagueMetadataType, InsertPlayerTeamMetadataType,
    InsertPlayerType,
    playerLeagueMetadataTable,
    playersTable, playerTeamMetadataTable
} from "@/db/schemas/playerDataTable";
import {db} from "@/db/database";
import AppToolkit from "@/lib/app-toolkit";
import {eq} from "drizzle-orm";
import {createClient, getUser} from "@/utils/supabase/server";
import {Player, PlayerLeagueMetaData, PlayerTeamMetaData} from "@/types/playerType";

export const getPlayer = async () => {
    const [{ user }, supabase] = await Promise.all([getUser(), createClient()]);

    const { data: playerData } = await supabase
        .from('playersTable')
        .select()
        .eq('userId', user?.id)
        .single();

    if (!playerData) {
        return { user, player: null };
    }

    const { data: leagueMetadata } = await supabase
        .from('playerLeagueMetadataTable')
        .select()
        .eq('userId', user?.id);

    const { data: teamMetadata } = await supabase
        .from('playerTeamMetadata')
        .select()
        .eq('userId', user?.id);

    const player: Player = {
        ...playerData,
        leagueMetadata: leagueMetadata as PlayerLeagueMetaData[],
        teamMetaData: teamMetadata as PlayerTeamMetaData[],
    };

    return { user, player };
};

export async function getAllPlayerData() {
    try {
        const result = await db
            .select({
                players: playersTable,
                leagueMetadata: playerLeagueMetadataTable,
                teamMetadata: playerTeamMetadataTable,
            })
            .from(playersTable)
            .leftJoin(
                playerLeagueMetadataTable,
                eq(playersTable.userId, playerLeagueMetadataTable.userId)
            )
            .leftJoin(
                playerTeamMetadataTable,
                eq(playersTable.userId, playerTeamMetadataTable.userId)
            );

        return { errorMessage: null, data: result }
    }catch(error){
        return { errorMessage: AppToolkit.getErrorMessage(error), data: [] }
    }
}

export async function insertPlayerData(playerData: InsertPlayerType) {
    try {
        await db.insert(playersTable).values(playerData);
        return { errorMessage: null }
    }catch(error){
        return { errorMessage: AppToolkit.getErrorMessage(error)}
    }
}

export async function insertPlayerLeagueMetadata(leagueMetadata: InsertPlayerLeagueMetadataType) {
    try {
        await db.insert(playerLeagueMetadataTable).values(leagueMetadata);
        return { errorMessage: null }
    }catch(error){
        return { errorMessage: AppToolkit.getErrorMessage(error)}
    }
}

export async function insertPlayerTeamMetadata(teamMetadata: InsertPlayerTeamMetadataType) {
    try {
        await db.insert(playerTeamMetadataTable).values(teamMetadata);
        return { errorMessage: null }
    }catch(error){
        return { errorMessage: AppToolkit.getErrorMessage(error)}
    }
}