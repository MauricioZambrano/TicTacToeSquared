import { allSquaresPlayed, checkWinner, isGameOver, isPlayerOrTie } from '../../utils/gameHelpers';
import { Player } from '../../utils/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Tied = 'Tied';
export type GameResults = undefined | Player | Tied;
export type GameResultsBoard = Array<Array<GameResults>>;
export type LocalBoardArray = Array<Array<Player | undefined>>;

export enum GameStatus {
    NOT_STARTED,
    IN_PROGRESS,
    FINISHED
}

export interface RowCol {
    row: number
    col: number
}

export interface PlaySquareInterface {
    bigBoardRC: RowCol;
    localBoardRC: RowCol;
}

export interface TicTacToeBoard {
    localBoard: LocalBoardArray;
    localGameWinner: GameResults;
}

export interface GameState {
    board: TicTacToeBoard[][];
    currentPlayer: Player;
    macroGameResults: GameResultsBoard;
    currentGameStatus: GameStatus;
    gameWinner?: GameResults;
    currentBigSquare?: RowCol;
}

const initializeLocalBoard = (): number[][] => Array.from({ length: 3 }, () => Array(3).fill(undefined));

const initializeTicTacToeBoard = (): TicTacToeBoard => ({
    localBoard: initializeLocalBoard(),
    localGameWinner: undefined
});

const initializeMacroGameResults = (): GameResultsBoard => {
    return Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => undefined));
};

const initializeBoard = (): TicTacToeBoard[][] =>
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => initializeTicTacToeBoard()));

const initialState: GameState = {
    board: initializeBoard(),
    macroGameResults: initializeMacroGameResults(),
    currentGameStatus: GameStatus.IN_PROGRESS,
    currentPlayer: Player.PLAYER_1
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        playSquare: (state, action: PayloadAction<PlaySquareInterface>) => {
            const { bigBoardRC, localBoardRC } = action.payload;

            // Change state
            if (state.board[bigBoardRC.row][bigBoardRC.col].localBoard[localBoardRC.row][localBoardRC.col] === undefined) {
                state.board[bigBoardRC.row][bigBoardRC.col].localBoard[localBoardRC.row][localBoardRC.col] = state.currentPlayer;

                if (state.macroGameResults[localBoardRC.row][localBoardRC.col] === undefined && !allSquaresPlayed(state.board[bigBoardRC.row][bigBoardRC.col].localBoard)) {
                    state.currentBigSquare = { row: localBoardRC.row, col: localBoardRC.col };
                } else {
                    state.currentBigSquare = undefined;
                }
            } else {
                throw new Error('Attempting to override played square');
            }

            // Check if local game is won
            const isLocalGameWon: boolean | GameResults = checkWinner(state.board[bigBoardRC.row][bigBoardRC.col].localBoard);

            if (isPlayerOrTie(isLocalGameWon)) {
                console.log(isLocalGameWon)
                state.board[bigBoardRC.row][bigBoardRC.col].localGameWinner = isLocalGameWon as GameResults;
                state.macroGameResults[bigBoardRC.row][bigBoardRC.col] = isLocalGameWon as GameResults;

                // Check if the game is over
                const gameCheck: GameResults | boolean = isGameOver(state.macroGameResults);
                if (gameCheck) {
                    state.gameWinner = gameCheck as GameResults;
                    state.currentGameStatus = GameStatus.FINISHED;
                }
            }
        },
        changePlayer: (state) => {
            state.currentPlayer = state.currentPlayer === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1;
        }
    },
});

export const { playSquare, changePlayer } = gameSlice.actions;
