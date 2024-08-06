import { ReactElement } from "react";
import { TicTacToeBoard } from "./TicTacToeBoard";
import { CurrentPlayerIndicator } from "./CurrentPlayerIndicator";
import { useSelector } from "react-redux";
import { GameStatus } from "../../store/slices/gameSlice";
import { useGameStatus } from "../../store/selectors/gameSelectors";
import { RootState } from "../../store/rootReducer";
import { GameHistory } from "./GameHistory";
import "./styles/game.scss";

export interface GameProps { };

export const Game = (props: GameProps): ReactElement => {
    const gameStatus: GameStatus = useSelector((state: RootState) => useGameStatus(state));

    return (
        <div className="game-container" data-testid="game-container">
            <GameHistory />
            <div className="main-game-section">
                <CurrentPlayerIndicator />
                {
                    gameStatus === GameStatus.IN_PROGRESS ?
                        <TicTacToeBoard /> :
                        "Game Over!"
                }
            </div>
        </div>
    );
};