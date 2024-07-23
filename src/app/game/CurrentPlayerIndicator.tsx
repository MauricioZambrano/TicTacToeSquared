import { useCurrentPlayer } from "@/store/selectors/gameSelectors";
import { GameState } from "@/store/slices/gameSlice";
import { Player } from "../../utils/constants";
import { getPlayerSymbol } from "../../utils/gameHelpers";
import { useSelector } from "react-redux"


export const CurrentPlayerIndicator = () => {
    const currentPlayer: Player = useSelector((state: { game: GameState }) => useCurrentPlayer(state));
    const playerDisplayValue = getPlayerSymbol(currentPlayer);
    return (
        <div>
            <span>Current Player: </span> {playerDisplayValue}
        </div>
    )
}