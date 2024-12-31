import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import League from "@/types/leagueTypes";

type AppState = {
    league?: League
}

const initialState: AppState = {
    league: undefined
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