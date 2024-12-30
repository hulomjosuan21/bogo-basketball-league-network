'use server'
import {
    InsertPlayerType,
    playersTable
} from "@/db/schemas/playerDataTable";
import {db} from "@/db/database";
import AppToolkit from "@/lib/app-toolkit";
import {createClient, getUser} from "@/utils/supabase/server";
import {Player} from "@/types/playerType";
import {GenderTypes} from "@/lib/utils";

export const getPlayer = async () => {
    const [{ user }, supabase] = await Promise.all([getUser(), createClient()]);
    if (!user) {
        return { user: null, player: null };
    }
    const { data: playerData } = await supabase
        .from('playersTable')
        .select()
        .eq('userId', user?.id)
        .single();

    if (!playerData) {
        return { user, player: null };
    }

    const player: Player = playerData;

    return { user, player };
};

export async function getAllPlayerData() {
    try {
        const players: Player[] = await db
            .select()
            .from(playersTable);

        return { players }
    }catch{
        return { players: [] }
    }
}

export async function getPlayersDataByIds(playerIds: string[]) {
    try {
        const supabase = await createClient();
        const { data } = await supabase
            .from('playersTable')
            .select()
            .in('id', playerIds);

        if (!data) {
            return { players: [] as Player[] };
        }

        const players = data as Player[];

        return { players };
    } catch {
        return { players: [] as Player[] };
    }
}

export async function getPlayersDataWhere(column: keyof typeof playersTable, value: string) {
    try {
        const supabase = await createClient();
        const { data } = await supabase
            .from('playersTable')
            .select()
            .like(column, value);

        if(!data){
            return { players: [] as Player[] }
        }

        const players = data as Player[];

        return { players}
    }catch{
        return { players: [] as Player[] }
    }
}

export async function insertPlayerData(formData: FormData) {
    const {userData} = await getUser();

    if(!userData){
        return { errorMessage: 'User data not found' }
    }

    const nickname = formData.get('nickname') as string;
    const jerseyNumber = formData.get('jerseyNumber') as string;
    const primaryPosition = formData.get('primaryPosition') as string;
    const secondaryPosition = formData.get('secondaryPosition') as string;
    const playerHeight = formData.get('playerHeight') as string;
    const playerWeight = formData.get('playerWeight') as string;
    const gender = formData.get('gender') as GenderTypes;

    const playerData: InsertPlayerType = {
        userId: userData.userId,
        fullName: `${userData.firstName} ${userData.lastName}`,
        nickname,
        jerseyNumber: parseInt(jerseyNumber),
        playerHeight,
        playerWeight,
        primaryPosition,
        secondaryPosition,
        leagueMetadata: [],
        teamMetaData: [],
        gamesPlayed: 0,
        gender
    };

    try{
        await db.insert(playersTable).values(playerData);
        return { errorMessage: null }
    }catch (error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }
}