import { Player } from "../../../utils/constants";
import { GameState, GameStatus, RowCol } from "../../slices/gameSlice";
import {
    useCurrentPlayer,
    useCurrentSquare,
    useCurrentBigSquare,
    useIsCurrentBigSquare
} from "../gameSelectors";

describe('Selectors', () => {
    let state: { game: GameState };

    beforeEach(() => {
        state = {
            game: {
                currentPlayer: 1,
                board: [
                    [
                        { localBoard: [[undefined, undefined], [undefined, undefined]], localGameWinner: undefined },
                        { localBoard: [[undefined, undefined], [undefined, undefined]], localGameWinner: undefined }
                    ],
                    [
                        { localBoard: [[undefined, undefined], [undefined, undefined]], localGameWinner: undefined },
                        { localBoard: [[undefined, undefined], [undefined, undefined]], localGameWinner: undefined }
                    ]
                ],
                macroGameResults: [
                    [undefined, undefined],
                    [undefined, undefined]
                ],
                currentBigSquare: { row: 0, col: 0 },
                currentGameStatus: GameStatus.IN_PROGRESS
            }
        };
    });

    it('useCurrentPlayer should return the current player', () => {
        const currentPlayer = useCurrentPlayer(state);
        expect(currentPlayer).toEqual(state.game.currentPlayer);
    });

    it('useCurrentSquare should return the player in the specified square', () => {
        state.game.board[0][0].localBoard[0][0] = Player.PLAYER_1;
        const player = useCurrentSquare(state, { row: 0, col: 0 }, { row: 0, col: 0 });
        expect(player).toEqual(Player.PLAYER_1);
    });

    it('useCurrentSquare should return undefined if the square is empty', () => {
        const player = useCurrentSquare(state, { row: 0, col: 0 }, { row: 1, col: 1 });
        expect(player).toBeUndefined();
    });

    it('useCurrentBigSquare should return the current big square', () => {
        const currentBigSquare = useCurrentBigSquare(state);
        expect(currentBigSquare).toEqual(state.game.currentBigSquare);
    });

    it('useIsCurrentBigSquare should return true if the current big square is undefined', () => {
        state.game.currentBigSquare = undefined;
        const isCurrent = useIsCurrentBigSquare(state, { row: 1, col: 1 });
        expect(isCurrent).toBe(true);
    });

    it('useIsCurrentBigSquare should return true if the specified square is the current big square', () => {
        const isCurrent = useIsCurrentBigSquare(state, { row: 0, col: 0 });
        expect(isCurrent).toBe(true);
    });

    it('useIsCurrentBigSquare should return false if the specified square is not the current big square', () => {
        const isCurrent = useIsCurrentBigSquare(state, { row: 1, col: 1 });
        expect(isCurrent).toBe(false);
    });
});