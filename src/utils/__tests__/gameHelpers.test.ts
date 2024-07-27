import { GameResultsBoard } from "@/store/slices/gameSlice";
import { GRID_SIZE, Player, TIED } from "../constants";
import { allSquaresPlayed, checkWinner, getPlayerSymbol, getSquareClassname, isGameOver, isPlayerOrTie, isTie } from "../gameHelpers";

const p1 = Player.PLAYER_1;
const p2 = Player.PLAYER_2;

const p1Row = [p1, p1, p1];
const undefinedRow = [undefined, undefined, undefined];

const testCases = [
    {
        description: 'top-left corner',
        input: { row: 0, col: 0 },
        expected: ['bottom-border', 'right-border']
    },
    {
        description: 'top-right corner',
        input: { row: 0, col: GRID_SIZE - 1 },
        expected: ['bottom-border', 'left-border']
    },
    {
        description: 'bottom-left corner',
        input: { row: GRID_SIZE - 1, col: 0 },
        expected: ['top-border', 'right-border']
    },
    {
        description: 'bottom-right corner',
        input: { row: GRID_SIZE - 1, col: GRID_SIZE - 1 },
        expected: ['top-border', 'left-border']
    },
    {
        description: 'middle square',
        input: { row: 1, col: 1 },
        expected: ['top-border', 'bottom-border', 'left-border', 'right-border']
    },
    {
        description: 'edge square',
        input: { row: 0, col: 1 },
        expected: ['bottom-border', 'left-border', 'right-border']
    }
];

describe('gameHelpers', () => {
    describe('getSquareClassname', () => {
        it.each(testCases)('should return correct class names for $description', ({ input, expected }) => {
            const result = getSquareClassname(input);
            expected.forEach(classname => {
                expect(result).toContain(classname);
            });
        });
    });

    describe('getPlayerSymbol', () => {
        it.each`
        currentValue | returnValue
        ${Player.PLAYER_1} | ${'X'}
        ${Player.PLAYER_2} | ${'O'}
        ${TIED} | ${'T'}
        ${undefined} | ${undefined}
        `('should return $returnValue when $currentValue is given', ({ currentValue, returnValue }) => {
            expect(getPlayerSymbol(currentValue)).toEqual(returnValue);
        });
    });

    describe('checkWinner', () => {
        it.each`
        winType | board | result
        ${'row'} | ${[[p1, p1, p1], undefinedRow, undefinedRow]} | ${p1}
        ${'col'} | ${[[p1, undefined, undefined], [p1, undefined, undefined], [p1, undefined, undefined]]} | ${p1}
        ${'diag'} | ${[[p1, undefined, undefined], [undefined, p1, undefined], [undefined, undefined, p1]]} | ${p1}
        ${'anti-diag'} | ${[[undefined, undefined, p1], [undefined, p1, undefined], [p1, undefined, undefined]]} | ${p1}
        ${'tied'} | ${[[p1, p2, p1], [p2, p1, p2], [p2, p1, p2]]} | ${TIED}
        `('should return $result for $winType', ({ board, result }) => {
            expect(checkWinner(board)).toEqual(result);
        })
    });

    describe('isTie', () => {
        it('should return true when is tied', () => {
            expect(isTie(TIED)).toBeTruthy();
        });
        it('should return false when not tied', () => {
            expect(isTie('TiEd')).toBeFalsy();
        });
    });

    describe('isPlayerOrTie', () => {
        it('should return true when is tied', () => {
            expect(isPlayerOrTie(TIED)).toBeTruthy();
        });
        it('should return true when is player', () => {
            expect(isPlayerOrTie(p1)).toBeTruthy();
        });
        it('should be false when it is not a player or tie', () => {
            expect(isPlayerOrTie('blah')).toBeFalsy();
        });
    });

    describe('allSquaresPlayed', () => {
        it('should return true when all rows are played', () => {
            const board = [p1Row, p1Row, p1Row];
            expect(allSquaresPlayed(board)).toBeTruthy();
        });
        it('should return false when not all squares are played', () => {
            const board = [p1Row, p1Row, [undefined, p2, p2]];
            expect(allSquaresPlayed(board)).toBeFalsy();
        });
    });

    describe('isGameOver', () => {
        // Note: this is just a wrapper for checkWinner. See tests above
        it('should work with GameResultBoard', () => {
            const board: GameResultsBoard = [p1Row, undefinedRow, undefinedRow];
            expect(isGameOver(board)).toEqual(p1);
        });
    });
});