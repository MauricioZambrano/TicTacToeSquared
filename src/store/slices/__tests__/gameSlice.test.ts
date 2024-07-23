import { configureStore } from '@reduxjs/toolkit';
import { gameSlice, playSquare, changePlayer, GameStatus } from '../gameSlice';
import { Player } from '../../../utils/constants';
import type { GameState, RowCol, TicTacToeBoard } from '../gameSlice';
import { AppStore } from '@/store/store';

const initializeLocalBoard = (): number[][] => Array.from({ length: 3 }, () => Array(3).fill(undefined));

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
        expect(state.currentPlayer).toEqual(Player.PLAYER_1);
    });

    it('should handle playSquare action', () => {
        const bigBoardRC: RowCol = { row: 0, col: 0 };
        const localBoardRC: RowCol = { row: 1, col: 1 };

        store.dispatch(playSquare({ bigBoardRC, localBoardRC }));
        const state: GameState = store.getState().game;

        expect(state.board[bigBoardRC.row][bigBoardRC.col].localBoard[localBoardRC.row][localBoardRC.col]).toEqual(Player.PLAYER_1);
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
        expect(state.board[bigBoardRC.row][bigBoardRC.col].localBoard[localBoardRC.row][localBoardRC.col]).toEqual(Player.PLAYER_1);
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
    it('should update macro game state when a player has won a local square', () => {
        const bigBoardRC: RowCol = { row: 0, col: 0 };

        // Simulate a winning condition for Player 1 in the local board at bigBoardRC
        const winningMoves: RowCol[] = [
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 }
        ];

        winningMoves.forEach(localBoardRC => {
            store.dispatch(playSquare({ bigBoardRC, localBoardRC }));
        });

        const state: GameState = store.getState().game;

        expect(state.board[0][0].localGameWinner).toEqual(Player.PLAYER_1);
        expect(state.macroGameResults[0][0]).toEqual(Player.PLAYER_1);
        expect(state.currentGameStatus).toEqual(GameStatus.IN_PROGRESS);
        expect(state.gameWinner).toEqual(undefined);
    });
    it('should win game when a player has won 3 squares', () => {
        const bigBoardRC: RowCol[] = [
            { row: 0, col: 0 },
            { row: 1, col: 0 },
            { row: 2, col: 0 }
        ];

        // Simulate a winning condition for Player 1 in the local board at bigBoardRC
        const winningMoves: RowCol[] = [
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },
        ];

        bigBoardRC.map((bigBoardRC) => {
            winningMoves.forEach(localBoardRC => {
                store.dispatch(playSquare({ bigBoardRC, localBoardRC }));
            });
        })


        const state: GameState = store.getState().game;

        expect(state.board[0][0].localGameWinner).toEqual(Player.PLAYER_1);
        expect(state.macroGameResults[0][0]).toEqual(Player.PLAYER_1);
        expect(state.board[1][0].localGameWinner).toEqual(Player.PLAYER_1);
        expect(state.macroGameResults[1][0]).toEqual(Player.PLAYER_1);
        expect(state.board[2][0].localGameWinner).toEqual(Player.PLAYER_1);
        expect(state.macroGameResults[2][0]).toEqual(Player.PLAYER_1);
        expect(state.currentGameStatus).toEqual(GameStatus.FINISHED);
        expect(state.gameWinner).toEqual(Player.PLAYER_1);
    });
}); 
