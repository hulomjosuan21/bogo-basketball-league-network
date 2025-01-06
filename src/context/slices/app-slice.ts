import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import League from "@/types/leagueTypes";
import { Match } from "@/types/matchType";

type AppState = {
    league?: League
    isLive: boolean
    gameRoute: string,
    currentMatch: Match | null
}

const initialState: AppState = {
    league: undefined,
    isLive: false,
    gameRoute: '/barangayAdmin/page/game',
    currentMatch: null
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLeagueAppState: (state, action: PayloadAction<League | undefined>) => {
            state.league = action.payload;
        }
    }
})

export const { setLeagueAppState } = appSlice.actions
export default appSlice.reducer