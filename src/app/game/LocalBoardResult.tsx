import { GameResults } from "../../store/slices/gameSlice"
import { getPlayerSymbol } from "../../utils/gameHelpers";
import classNames from "classnames";
import "./styles/localBoardResult.scss"

export interface LocalBoardResultProps {
    result: GameResults
}

export const LocalBoadResult: React.FC<LocalBoardResultProps> = (props) => {
    const playerSymbol = getPlayerSymbol(props.result);
    const localBoardResultClassnames = classNames("local-board-result", `${playerSymbol}-won`)

    return (
        <div className={localBoardResultClassnames}>
            {playerSymbol}
        </div>
    )


};
