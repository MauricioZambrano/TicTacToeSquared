import { useSelector } from "react-redux";
import { RootState } from '../../store/rootReducer';
import { useMoveHistory } from "@/store/selectors/gameSelectors";
import "./styles/gameHistory.scss"

export interface GameHistoryProps {

};

export const GameHistory = (props: GameHistoryProps) => {
    const moveHistory = useSelector((state: RootState) => useMoveHistory(state));

    return (
        <div className="game-history">
            <h3>Move History</h3>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Big Board</th>
                        <th>Local Board</th>
                    </tr>
                </thead>
                <tbody>
                    {moveHistory && moveHistory.map((move, key) =>
                        <tr key={key}>
                            <td>{move.player}</td>
                            <td>{`${move.bigRowCol.row} ${move.bigRowCol.col}`}</td>
                            <td>{`${move.localRowCol.row} ${move.localRowCol.col}`}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};
