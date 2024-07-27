import "./styles/LocalTicTacToeBoard.scss"
import { array_mapper } from "../../utils/constants"
import { Square } from "./Square"
import { GameResults, RowCol } from '../../store/slices/gameSlice'
import { getSquareClassname } from "../../utils/gameHelpers";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useIsLocalGameFinished } from "../../store/selectors/gameSelectors";
import { LocalBoadResult } from "./LocalBoardResult";

export interface LocalTicTacToeBoardProps {
    bigBoardRC: RowCol;
}

export const LocalTicTacToeBoard: React.FC<LocalTicTacToeBoardProps> = ({ bigBoardRC }) => {
    const localBoardWinner: GameResults = useSelector((state: RootState) => useIsLocalGameFinished(state, bigBoardRC))
    const localBoardClassnames = classNames('local-board', getSquareClassname(bigBoardRC));

    return (
        <div className={localBoardClassnames}>
            {!!localBoardWinner ?
                <LocalBoadResult result={localBoardWinner} />
                :
                array_mapper.map((_, localRow) => (
                    <div className="local-row" key={localRow} data-testid="local-board">
                        {array_mapper.map((_, localCol) => (
                            <Square
                                key={`${localRow}-${localCol}`}
                                bigBoardRC={bigBoardRC}
                                localBoardRC={{ row: localRow, col: localCol }}
                            />
                        ))}
                    </div>
                ))}
        </div>
    );
};