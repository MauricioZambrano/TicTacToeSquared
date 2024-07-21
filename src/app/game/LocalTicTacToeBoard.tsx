import { array_mapper } from "../../utils/constants"
import { Square } from "./Square"
import { RowCol } from '../../store/slices/gameSlice'
import "./styles/LocalTicTacToeBoard.scss"

export interface LocalTicTacToeBoardProps {
    bigBoardRC: RowCol;
}

export const LocalTicTacToeBoard: React.FC<LocalTicTacToeBoardProps> = ({ bigBoardRC }) => {
    return (
        <div className="local-board">
            {array_mapper.map((_, localRow) => (
                <div className="local-row" key={localRow}>
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