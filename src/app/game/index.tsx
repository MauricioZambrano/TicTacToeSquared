import { ReactElement } from "react";
import { LocalTicTacToeBoard } from "./LocalTicTacToeBoard";


export const Game = (): ReactElement => {
    return (
        <div>
            <LocalTicTacToeBoard bigBoardRC={{ row: 0, col: 0 }} />
        </div>
    );
};