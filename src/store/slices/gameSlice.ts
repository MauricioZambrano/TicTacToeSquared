import { Player } from '../../utils/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Tied = 'Tied';

export interface RowCol {
    row: number
    col: number
}

export interface PlaySquareInterface {
    bigBoardRC: RowCol;
    localBoardRC: RowCol;
}

export interface TicTacToeBoard {
    localBoard: number[][];
    localGameWinner: Player | Tied | undefined;
}

export interface GameState {
    board: TicTacToeBoard[][];
    currentPlayer: number;
}

const initializeLocalBoard = (): number[][] => Array.from({ length: 3 }, () => Array(3).fill(null));

const initializeTicTacToeBoard = (): TicTacToeBoard => ({
    localBoard: initializeLocalBoard(),
    localGameWinner: undefined
});

const initializeBoard = (): TicTacToeBoard[][] =>
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => initializeTicTacToeBoard()));

const initialState: GameState = {
    board: initializeBoard(),
    currentPlayer: Player.PLAYER_1
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        playSquare: (state, action: PayloadAction<PlaySquareInterface>) => {
            const { bigBoardRC, localBoardRC } = action.payload;

            if (state.board[bigBoardRC.row][bigBoardRC.col].localBoard[localBoardRC.row][localBoardRC.col] === null) {
                state.board[bigBoardRC.row][bigBoardRC.col].localBoard[localBoardRC.row][localBoardRC.col] = state.currentPlayer;
            } else {
                throw new Error('Attempting to override played square');
            }
        },
        changePlayer: (state) => {
            state.currentPlayer = state.currentPlayer === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1;
        }
    },
});

export const { playSquare, changePlayer } = gameSlice.actions;
