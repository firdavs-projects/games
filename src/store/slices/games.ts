import { createSlice, Dispatch } from '@reduxjs/toolkit';
import {IGame} from "../../interfaces";
import games from "../../constants/games_test.json"

// const testGame: IGame = {
//     title: 'Game Title',
//     provider: 'provider',
//     demo: 'Demo',
//     collections: {
//         popularity: 1,
//         novelty: 0.5
//     },
//     real: {
//         BTC: {id: 323},
//         ETH: {id: 54546},
//         EUR: {id: 524},
//         LTC: {id: 54545},
//         RUB: {id: 7857},
//         USD: {id: 7857},
//     },
// }
interface IGamesState {
    games: [string, IGame][];
    loading: boolean
}
const initialState: IGamesState = {
    games: [],
    loading: false,
};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGames: (state, actions) => {
            state.games = actions.payload;
        },
        setLoading: (state, actions) => {
            state.loading = actions.payload;
        }
    },
});

export const { setGames, setLoading } = gamesSlice.actions;

export const getGames = () => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    // const gamesResponse: IGame[] = await Http.get(apiRoutes.games);
    const arr = Object.entries(games)
        .sort(([, a], [, b]) => a.collections.popularity - b.collections.popularity)
    dispatch(setGames(arr));
    dispatch(setLoading(false))
};

export default gamesSlice.reducer;
