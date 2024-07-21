"use client";
import "./styles/square.scss";
import { useCurrentSquare } from '../../store/selectors/gameSelectors';
import { RowCol, changePlayer, playSquare } from '../../store/slices/gameSlice';
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getSquareClassname } from "../../utils/gameHelpers";
import classNames from "classnames";
import { Player } from '../../utils/constants';
import { useMemo } from "react";

export interface SquareProps {
    bigBoardRC: RowCol;
    localBoardRC: RowCol;
}

export const Square: React.FC<SquareProps> = ({ bigBoardRC, localBoardRC }) => {
    const dispatch: AppDispatch = useDispatch();
    const currentValue: Player | null = useSelector((state: RootState) => useCurrentSquare(state, bigBoardRC, localBoardRC));
    const squareClasses = classNames("square-container", getSquareClassname(localBoardRC));

    const handleOnClick = () => {
        if (currentValue === null) {
            dispatch(playSquare({ bigBoardRC, localBoardRC }))
            dispatch(changePlayer());
        }
    };

    const playerDisplayValue = useMemo((): string | null => {
        switch (currentValue) {
            case Player.PLAYER_1:
                return 'X';
            case Player.PLAYER_2:
                return 'O';
            default:
                return null;
        }
    }, [currentValue]);

    return (
        <div className={squareClasses} onClick={handleOnClick} role="button">
            {playerDisplayValue}
        </div>
    )
};