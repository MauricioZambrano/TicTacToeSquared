import React from 'react';
import { GameStatus } from '../../../store/slices/gameSlice';
import { render } from '../../../../test-utils';
import { screen } from '@testing-library/react'
import { Game } from '../';
import { useSelector } from 'react-redux';
import { useGameStatus } from '../../../store/selectors/gameSelectors';
import '@testing-library/jest-dom';


jest.mock('../TicTacToeBoard', () => ({
    TicTacToeBoard: () => <div data-testid="mocked-tictactoeboard">Mocked TicTacToeBoard</div>
}));

jest.mock('../CurrentPlayerIndicator', () => ({
    CurrentPlayerIndicator: () => <div data-testid="mocked-currentplayerindicator">Mocked CurrentPlayerIndicator</div>
}));

jest.mock('../GameHistory', () => ({
    GameHistory: () => <div data-testid="mocked-gamehistory">Mocked GameHistory</div>
}));

jest.mock('react-redux', () => ({
    useSelector: jest.fn()
}));

jest.mock('../../../store/selectors/gameSelectors', () => ({
    useGameStatus: jest.fn()
}));


describe('<Game />', () => {
    beforeEach(() => {
        (useSelector as unknown as jest.Mock).mockClear();
        (useGameStatus as jest.Mock).mockClear();
    });

    it('renders game in progress', () => {
        (useSelector as unknown as jest.Mock).mockReturnValue(GameStatus.IN_PROGRESS);
        (useGameStatus as jest.Mock).mockReturnValue(GameStatus.IN_PROGRESS);
        console.log(Game);
        render(<Game />);

        expect(screen.getByTestId('game-container')).toBeInTheDocument();
        expect(screen.getByTestId('mocked-gamehistory')).toBeInTheDocument();
        expect(screen.getByTestId('mocked-currentplayerindicator')).toBeInTheDocument();
        expect(screen.getByTestId('mocked-tictactoeboard')).toBeInTheDocument();
        expect(screen.queryByText('Game Over!')).not.toBeInTheDocument();
    });

    it('renders game over', () => {
        (useSelector as unknown as jest.Mock).mockReturnValue(GameStatus.FINISHED);
        (useGameStatus as jest.Mock).mockReturnValue(GameStatus.FINISHED);

        render(<Game />);

        expect(screen.getByTestId('game-container')).toBeInTheDocument();
        expect(screen.getByTestId('mocked-gamehistory')).toBeInTheDocument();
        expect(screen.getByTestId('mocked-currentplayerindicator')).toBeInTheDocument();
        expect(screen.queryByTestId('mocked-tictactoeboard')).not.toBeInTheDocument();
        expect(screen.getByText('Game Over!')).toBeInTheDocument();
    });
})