import { useCurrentPlayer } from "@/store/selectors/gameSelectors";
import { GameState } from "@/store/slices/gameSlice";
import { Player } from "../../utils/constants";
import { getPlayerSymbol } from "../../utils/gameHelpers";
import { useSelector } from "react-redux"
import './styles/currentPlayerIndicator.scss';


export const CurrentPlayerIndicator = () => {
    const currentPlayer: Player = useSelector((state: { game: GameState }) => useCurrentPlayer(state));
    const playerDisplayValue = getPlayerSymbol(currentPlayer);
    return (
        <div className={`player-${playerDisplayValue}`} data-testid="player-indicator">
            <span className="current-player-text">Current Player: </span> {playerDisplayValue}
        </div>
    )
}