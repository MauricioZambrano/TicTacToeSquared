"use client";
import "./styles/square.scss";
import { useCurrentSquare, useIsCurrentBigSquare, useIsLocalGameFinished } from '../../store/selectors/gameSelectors';
import { GameResults, RowCol, changePlayer, playSquare } from '../../store/slices/gameSlice';
import { AppDispatch } from "../../store/store";
import { RootState } from "../../store/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { getPlayerSymbol, getSquareClassname } from "../../utils/gameHelpers";
import classNames from "classnames";
import { Player, TIED } from '../../utils/constants';

export interface SquareProps {
    bigBoardRC: RowCol;
    localBoardRC: RowCol;
}

export const Square: React.FC<SquareProps> = ({ bigBoardRC, localBoardRC }) => {
    const dispatch: AppDispatch = useDispatch();
    const currentValue: Player | undefined = useSelector((state: RootState) => useCurrentSquare(state, bigBoardRC, localBoardRC));
    const isCurrentBigSquare: boolean = useSelector((state: RootState) => useIsCurrentBigSquare(state, bigBoardRC));
    const localGameWinner: GameResults = useSelector((state: RootState) => useIsLocalGameFinished(state, bigBoardRC));
    const squareClasses = classNames(
        "square-container",
        getSquareClassname(localBoardRC),
        {
            "is-played": currentValue !== undefined || localGameWinner !== undefined,
            "is-player-one": currentValue === Player.PLAYER_1 || localGameWinner === Player.PLAYER_1,
            "is-player-two": currentValue === Player.PLAYER_2 || localGameWinner === Player.PLAYER_2,
            "is-tied": localGameWinner === TIED,
            "is-current-big-square": isCurrentBigSquare
        }
    );

    const handleOnClick = () => {
        if (currentValue === undefined && isCurrentBigSquare) {
            dispatch(playSquare({ bigBoardRC, localBoardRC }))
            dispatch(changePlayer());
        }
    };

    const playerDisplayValue = getPlayerSymbol(currentValue);

    return (
        <div className={squareClasses} onClick={handleOnClick} role="button">
            {playerDisplayValue}
        </div>
    )
};