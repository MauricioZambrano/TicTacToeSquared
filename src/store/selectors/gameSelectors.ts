import { Player } from "@/utils/constants";
import { GameResults, GameStatus, Move, RowCol } from "../slices/gameSlice";
import { RootState } from '../rootReducer';


export const useCurrentPlayer = (state: RootState): Player => {
    return state.game.currentPlayer;
}

export const useCurrentSquare = (
    state: RootState,
    bigBoardRC: RowCol,
    localBoardRC: RowCol
): Player | undefined => {
    return state.game.board[bigBoardRC.row][bigBoardRC.col].localBoard[localBoardRC.row][localBoardRC.col];
}

export const useCurrentBigSquare = (state: RootState): RowCol | undefined => {
    return state.game.currentBigSquare;
}

export const useIsCurrentBigSquare = (state: RootState, bigBoardRC: RowCol): boolean => {
    const bigSquare = useCurrentBigSquare(state);
    if (bigSquare === undefined) {
        return true;
    }

    return bigBoardRC.row == state.game.currentBigSquare?.row && bigBoardRC.col == state.game.currentBigSquare?.col;
}

export const useIsLocalGameFinished = (state: RootState, bigBoardRC: RowCol): GameResults => {
    return state.game.macroGameResults[bigBoardRC.row][bigBoardRC.col];
}

export const useGameStatus = (state: RootState): GameStatus => {
    return state.game.currentGameStatus;
}

export const useMoveHistory = (state: RootState): Move[] | undefined => {
    return state.game.moveHistory;
};