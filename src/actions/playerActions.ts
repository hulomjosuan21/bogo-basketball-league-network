'use server'
import {
    InsertPlayerType,
    playersTable
} from "@/db/schemas/playerDataTable";
import {db} from "@/db/database";
import AppToolkit from "@/lib/app-toolkit";
import {createClient, getUser} from "@/utils/supabase/server";
import {Player, PlayerLeagueMetaData} from "@/types/playerType";
import {GenderTypes} from "@/lib/utils";
import {revalidatePath} from "next/cache";
import {sendSmsAction} from "@/actions/sendSmsActions";

export async function getAllPlayersSubmitLeague(leagueId: string, isAllowed: boolean) {
    const supabase = await createClient();

    const { data } = await supabase
        .from('playersTable')
        .select()
        .eq('leagueMetadata->>leagueId', leagueId)
        .eq('leagueMetadata->>isAllowed', isAllowed.toString());

    if (!data) {
        return { players: [] as Player[] };
    }

    return { players: data as Player[] };
}

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

export const getPlayerByFullNameAction = async (fullName: string) => {
    if (!fullName) {
        const players: Player[] = []
        return { players };
    }

    const [supabase] = await Promise.all([createClient()]);

    const { data: playerData } = await supabase
        .from('playersTable')
        .select()
        .ilike('fullName', `%${fullName}%`)

    if (!playerData) {
        const players: Player[] = []
        return { players };
    }

    const players: Player[] = playerData;

    return { players };
};

export async function updateLeagueMetadata(leagueMetadata: PlayerLeagueMetaData | null, playerId: string | undefined) {
    const [{ player }, supabase] = await Promise.all([
        getPlayer(),
        createClient(),
    ]);

    if (!player && !playerId) {
        throw new Error('No player found and no playerId provided!');
    }

    try {
        await supabase
            .from('playersTable')
            .update({ leagueMetadata })
            .eq('playerId', playerId ? playerId : player?.playerId);
        revalidatePath('/barangayAdmin/page/players/pending')
    } catch (error) {
        throw error;
    }
}

export async function getOnePlayerByIdAction(id: keyof typeof playersTable, _id: string){
    let isLoading = true;
    const supabase = await createClient();

    const { data: playerData } = await supabase.from('playersTable').select().eq(id, _id).single();

    isLoading = false;

    if(!playerData){
        return { player: null, isLoading };
    }

    const player: Player = playerData;

    return { player: player, isLoading };
}

export async function getAllPlayerDataAction() {
    const supabase = await createClient();
    const { data: playersData } = await supabase.from('playersTable').select()

    if(!playersData){
        return { players: [] as Player[] }
    }

    const players: Player[] = playersData;

    return { players }
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
        gender,
        playerId: AppToolkit.generateUid(nickname),
        phoneNumber: AppToolkit.fixPhoneNumber(userData.phoneNumber),
        email: userData.email
    };

    try{
        await db.insert(playersTable).values(playerData);
        return { errorMessage: null }
    }catch (error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }
}