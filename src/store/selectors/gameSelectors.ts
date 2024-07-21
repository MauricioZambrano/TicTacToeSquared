import { Player } from "@/utils/constants";
import { GameState, RowCol } from "../slices/gameSlice";


export const useCurrentPlayer = (state: { game: GameState }): Player => {
    return state.game.currentPlayer;
}

export const useCurrentSquare = (
    state: { game: GameState },
    bigBoardRC: RowCol,
    localBoardRC: RowCol
): Player | null => {
    return state.game.board[bigBoardRC.row][bigBoardRC.col].localBoard[localBoardRC.row][localBoardRC.col];
}
