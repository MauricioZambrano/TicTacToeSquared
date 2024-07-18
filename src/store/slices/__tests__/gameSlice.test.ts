import { configureStore } from '@reduxjs/toolkit';
import { gameSlice, playSquare, changePlayer, GameState } from '../gameSlice';
import { Player } from '../../../utils/constants';
import { AppStore } from '@/store/store';

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
        const state = store.getState().game;
        expect(state.board).toEqual(Array.from({ length: 9 }, () => Array(9).fill(null)));
        expect(state.currentPlayer).toEqual(0);
    });

    it('should handle playSquare action', () => {
        const bigSquare = 0;
        const smallSquare = 1;
        store.dispatch(playSquare({ bigSquare, smallSquare }));
        const state = store.getState().game;
        expect(state.board[bigSquare][smallSquare]).toEqual(0);
    });

    it('should handle changePlayer action', () => {
        store.dispatch(changePlayer());
        let state = store.getState().game;
        expect(state.currentPlayer).toEqual(Player.PLAYER_2);

        store.dispatch(changePlayer());
        state = store.getState().game;
        expect(state.currentPlayer).toEqual(Player.PLAYER_1);
    });

    it('should update the currentPlayer after playSquare action', () => {
        const bigSquare = 0;
        const smallSquare = 1;

        store.dispatch(playSquare({ bigSquare, smallSquare }));
        store.dispatch(changePlayer());

        let state = store.getState().game;
        expect(state.board[bigSquare][smallSquare]).toEqual(0);
        expect(state.currentPlayer).toEqual(Player.PLAYER_2);

        store.dispatch(playSquare({ bigSquare: 1, smallSquare: 1 }));
        store.dispatch(changePlayer());

        state = store.getState().game;
        expect(state.board[1][1]).toEqual(Player.PLAYER_2);
        expect(state.currentPlayer).toEqual(Player.PLAYER_1);
    });
});
