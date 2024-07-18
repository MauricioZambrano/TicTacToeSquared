import { Player } from '../../utils/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PlaySquareInterface {
    bigSquare: number;
    smallSquare: number;
}

export interface GameState {
    board: number[][];
    currentPlayer: number;
}

const initialState: GameState = {
    board: Array.from({ length: 9 }, () => Array(9).fill(null)),
    currentPlayer: 0
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        playSquare: (state, action: PayloadAction<PlaySquareInterface>) => {
            const { bigSquare, smallSquare } = action.payload;

            state.board[bigSquare][smallSquare] = state.currentPlayer;
        },
        changePlayer: (state) => {
            state.currentPlayer = state.currentPlayer === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1;
        }
    },
});

export const { playSquare, changePlayer } = gameSlice.actions;
