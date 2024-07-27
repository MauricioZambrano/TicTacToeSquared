import React from 'react';
import * as gameSelectors from '../../../store/selectors/gameSelectors';
import { render, screen } from '../../../../test-utils';
import { LocalTicTacToeBoard } from '../LocalTicTacToeBoard';
import '@testing-library/jest-dom';


// Mock the Square component
jest.mock('../Square', () => ({
    Square: jest.fn(() => <div data-testid="mocked-square">Mocked Square</div>)
}));

// Mock the gameSelectors
jest.mock('../../../store/selectors/gameSelectors', () => ({
    useIsLocalGameFinished: jest.fn(),
}));

describe('<LocalTicTacToeBoard />', () => {
    const rc = { row: 0, col: 0 };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display localBoard with mocked squares if localBoardWinner is undefined', () => {
        (gameSelectors.useIsLocalGameFinished as jest.Mock).mockReturnValue(undefined);

        render(<LocalTicTacToeBoard bigBoardRC={rc} />);

        expect(screen.queryAllByTestId('local-board')).toHaveLength(3);

        const mockedSquares = screen.getAllByTestId('mocked-square');
        expect(mockedSquares).toHaveLength(9);
    });
});