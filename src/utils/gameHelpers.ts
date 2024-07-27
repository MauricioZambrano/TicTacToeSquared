import { GameResults, GameResultsBoard, LocalBoardArray, RowCol, Tied } from '../store/slices/gameSlice';
import { GRID_SIZE, Player, TIED } from "./constants";
import classNames from "classnames";

export const getSquareClassname = (sq: RowCol): string => {
    return classNames({
        'top-border': sq.row !== 0,
        'bottom-border': sq.row !== GRID_SIZE - 1,
        'left-border': sq.col !== 0,
        'right-border': sq.col !== GRID_SIZE - 1
    });
};

export const getPlayerSymbol = (currentValue: Player | Tied | undefined): string | undefined => {
    switch (currentValue) {
        case Player.PLAYER_1:
            return 'X';
        case Player.PLAYER_2:
            return 'O';
        case TIED:
            return 'T';
        default:
            return undefined;
    }
}

export const checkWinner = (board: LocalBoardArray | GameResultsBoard): boolean | GameResults => {
    const size = board.length;
    let allCellsFilled = true;

    // Check rows
    for (let row = 0; row < size; row++) {
        if (board[row][0] !== undefined && board[row].every(cell => cell === board[row][0])) {
            return board[row][0] as Player;
        }
        if (board[row].some(cell => cell === undefined)) {
            allCellsFilled = false;
        }
    }

    // Check columns
    for (let col = 0; col < size; col++) {
        if (board[0][col] !== undefined && board.every(row => row[col] === board[0][col])) {
            return board[0][col] as Player;
        }
        if (board.some(row => row[col] === undefined)) {
            allCellsFilled = false;
        }
    }

    // Check main diagonal
    if (board[0][0] !== undefined && board.every((row, idx) => row[idx] === board[0][0])) {
        return board[0][0] as Player;
    }

    // Check anti-diagonal
    if (board[0][size - 1] !== undefined && board.every((row, idx) => row[size - 1 - idx] === board[0][size - 1])) {
        return board[0][size - 1] as Player;
    }

    if (allCellsFilled) {
        return TIED as Tied;
    }

    return false;
}

export const isTie = (result: any): boolean => {
    return result === TIED;
}

export const isPlayerOrTie = (value: any): boolean => {
    return Object.values(Player).includes(value) || isTie(value);
}

export const allSquaresPlayed = (board: LocalBoardArray): boolean => {
    return board.every(row => row.every(cell => {
        return cell !== undefined;
    }));
}

export const isGameOver = (board: GameResultsBoard): GameResults | boolean => {
    return checkWinner(board);
}