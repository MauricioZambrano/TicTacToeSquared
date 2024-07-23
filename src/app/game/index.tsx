import { ReactElement } from "react";
import { TicTacToeBoard } from "./TicTacToeBoard";
import { CurrentPlayerIndicator } from "./CurrentPlayerIndicator";
import { useSelector } from "react-redux";
import { GameStatus } from "../../store/slices/gameSlice";
import { useGameStatus } from "../../store/selectors/gameSelectors";
import { RootState } from "../../store/store";

export const Game = (): ReactElement => {
    const gameStatus: GameStatus = useSelector((state: RootState) => useGameStatus(state));

    return (
        <div className="game-container">
            <CurrentPlayerIndicator />
            {
                gameStatus === GameStatus.IN_PROGRESS ?
                    <TicTacToeBoard /> :
                    "Game Over!"
            }
        </div>
    );
};