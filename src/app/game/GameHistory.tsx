import { useSelector } from "react-redux";
import { RootState } from '../../store/rootReducer';
import { useMoveHistory } from "@/store/selectors/gameSelectors";
import { getPlayerSymbol } from '../../utils/gameHelpers';
import "./styles/gameHistory.scss"
import { ReactNode, useEffect, useRef } from "react";
import { Move } from "@/store/slices/gameSlice";

export interface GameHistoryProps {

};

export const GameHistory = (props: GameHistoryProps) => {
    const moveHistory: Move[] | undefined = useSelector((state: RootState) => useMoveHistory(state));
    const scrollableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
        }
    }, [moveHistory]);

    const moveHistoryBody = (): ReactNode => {
        return (moveHistory ? moveHistory?.map((move, key) => {
            const playerSymbol = getPlayerSymbol(move.player);

            return (
                <tr key={key}>
                    <td>{key + 1}</td>
                    <td className={`player-${playerSymbol}`}>{playerSymbol}</td>
                    <td>{`${move.bigRowCol.row} ${move.bigRowCol.col}`}</td>
                    <td>{`${move.localRowCol.row} ${move.localRowCol.col}`}</td>
                </tr>
            )
        }) : <></>);
    };

    return (
        <div className="game-history">
            <h3>Move History</h3>
            <div className="table-container" ref={scrollableRef}>
                <table>
                    <thead>
                        <tr>
                            <th>Move</th>
                            <th>Player</th>
                            <th>Big Board</th>
                            <th>Local Board</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moveHistory && moveHistoryBody()}
                    </tbody>
                </table>
            </div>
        </div>
    )
};
