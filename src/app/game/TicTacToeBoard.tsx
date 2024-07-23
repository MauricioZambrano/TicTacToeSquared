import { array_mapper } from "../../utils/constants";
import { LocalTicTacToeBoard } from "./LocalTicTacToeBoard";
import './styles/ticTacToeBoard.scss';

export interface TicTacToeBoardPops { }

export const TicTacToeBoard: React.FC<TicTacToeBoardPops> = (props) => {


    return (
        <div className="big-board">
            {array_mapper.map((_, bigRow) => (
                <div className="big-row" key={bigRow}>
                    {array_mapper.map((_, bigCol) => (
                        <LocalTicTacToeBoard
                            key={`${bigRow}-${bigCol}`}
                            bigBoardRC={{ row: bigRow, col: bigCol }}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}