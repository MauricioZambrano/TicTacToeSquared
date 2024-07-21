import { configureStore } from '@reduxjs/toolkit';
import { gameSlice, playSquare, changePlayer } from '../gameSlice';
import { Player } from '../../../utils/constants';
import type { GameState, RowCol, TicTacToeBoard } from '../gameSlice';
import { AppStore } from '@/store/store';

const initializeLocalBoard = (): number[][] => Array.from({ length: 3 }, () => Array(3).fill(null));

const initializeTicTacToeBoard = (): TicTacToeBoard => ({
    localBoard: initializeLocalBoard(),
    localGameWinner: undefined
});

const initializeBoard = (): TicTacToeBoard[][] =>
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => initializeTicTacToeBoard()));


describe('gameSlice', () => {
    let store: AppStore;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                game: gameSlice.reducer
            }
        });
    });

    it('should have initial state', () => {
        const state: GameState = store.getState().game;
        expect(state.board).toEqual(initializeBoard());
        expect(state.currentPlayer).toEqual(0);
    });

    it('should handle playSquare action', () => {
        const bigBoardRC: RowCol = { row: 0, col: 0 };
        const localBoardRC: RowCol = { row: 1, col: 1 };

        store.dispatch(playSquare({ bigBoardRC, localBoardRC }));
        const state: GameState = store.getState().game;

        expect(state.board[bigBoardRC.row][bigBoardRC.col].localBoard[localBoardRC.row][localBoardRC.col]).toEqual(0);
    });

    it('should handle changePlayer action', () => {
        store.dispatch(changePlayer());
        let state: GameState = store.getState().game;
        expect(state.currentPlayer).toEqual(Player.PLAYER_2);

        store.dispatch(changePlayer());
        state = store.getState().game;
        expect(state.currentPlayer).toEqual(Player.PLAYER_1);
    });

    it('should update the currentPlayer after playSquare action', () => {
        const bigBoardRC: RowCol = { row: 0, col: 0 };
        const localBoardRC: RowCol = { row: 1, col: 1 };

        store.dispatch(playSquare({ bigBoardRC, localBoardRC }));
        store.dispatch(changePlayer());

        let state: GameState = store.getState().game;
        expect(state.board[bigBoardRC.row][bigBoardRC.col].localBoard[localBoardRC.row][localBoardRC.col]).toEqual(0);
        expect(state.currentPlayer).toEqual(Player.PLAYER_2);

        store.dispatch(playSquare({ bigBoardRC: { row: 1, col: 1 }, localBoardRC: { row: 2, col: 2 } }));
        store.dispatch(changePlayer());

        state = store.getState().game;
        expect(state.board[1][1].localBoard[2][2]).toEqual(Player.PLAYER_2);
        expect(state.currentPlayer).toEqual(Player.PLAYER_1);
    });
    it('should throw error if playSquare action tries to override a played square', () => {
        const bigBoardRC: RowCol = { row: 0, col: 0 };
        const localBoardRC: RowCol = { row: 1, col: 1 };

        store.dispatch(playSquare({ bigBoardRC, localBoardRC }));

        expect(() => {
            store.dispatch(playSquare({ bigBoardRC, localBoardRC }));
        }).toThrow('Attempting to override played square');
    });
});
