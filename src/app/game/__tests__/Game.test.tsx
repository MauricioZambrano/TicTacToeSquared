import React from 'react';
import * as gameSelectors from '../../../store/selectors/gameSelectors';
import { GameStatus } from '../../../store/slices/gameSlice';
import { render } from '../../../../test-utils';
import { Game } from '..';
import '@testing-library/jest-dom';

const useGameStatusSpy = jest.spyOn(gameSelectors, 'useGameStatus');

// jest.mock('react-redux', () => ({
//     ...jest.requireActual('react-redux'),
//     useSelector: jest.fn(),
// }));


describe('<Game />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useGameStatusSpy.mockReturnValueOnce(GameStatus.IN_PROGRESS);
    })

    it('should display current player indicator', () => {
        const { getByTestId } = render(<Game />);
        expect(getByTestId("player-indicator")).toBeInTheDocument();
    });
    it('should display TicTacToe board when game is in progress', () => {
        const { getByTestId } = render(<Game />);
        expect(getByTestId("macro-board")).toBeInTheDocument();
    });
    it('should display Game Over! when game is finished', () => {
        useGameStatusSpy.mockReturnValueOnce(GameStatus.FINISHED);
        const { getByTestId } = render(<Game />);
        const gameContainer = getByTestId("game-container");
        expect(gameContainer).toBeInTheDocument();
        expect(gameContainer).toHaveTextContent('Game Over!');
    });
})