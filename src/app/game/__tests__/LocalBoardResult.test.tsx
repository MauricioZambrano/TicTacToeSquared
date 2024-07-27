import React from 'react';
import * as helperFunctions from '../../../utils/gameHelpers';
import { render, screen } from '../../../../test-utils';
import { LocalBoadResult, LocalBoardResultProps } from '../LocalBoardResult';
import { Player, TIED } from '../../../utils/constants';
import '@testing-library/jest-dom';

// Mock the getPlayerSymbol function
// jest.mock('../../../utils/gameHelpers', () => ({
//     getPlayerSymbol: (result: Player | typeof TIED) => {
//         if (result === Player.PLAYER_1) return 'X';
//         if (result === Player.PLAYER_2) return 'O';
//         return 'T';
//     },
// }));

const getPlayerSymbolSpy = jest.spyOn(helperFunctions, 'getPlayerSymbol');

describe('LocalBoardResult', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    const renderComponent = (props: LocalBoardResultProps) => {
        render(<LocalBoadResult {...props} />);
    };

    it('should have correct class for Player 1 win', () => {
        getPlayerSymbolSpy.mockReturnValueOnce('X');
        renderComponent({ result: Player.PLAYER_1 });
        expect(getPlayerSymbolSpy).toHaveBeenCalledWith(Player.PLAYER_1);
        const resultElement = screen.getByText('X');
        expect(resultElement).toHaveClass('local-board-result');
        expect(resultElement).toHaveClass('X-won');
        expect(screen.getByText('X')).toBeInTheDocument();
    });

    it('should have correct class for Player 2 win', () => {
        getPlayerSymbolSpy.mockReturnValueOnce('O');
        renderComponent({ result: Player.PLAYER_2 });
        expect(getPlayerSymbolSpy).toHaveBeenCalledWith(Player.PLAYER_2);
        const resultElement = screen.getByText('O');
        expect(resultElement).toHaveClass('local-board-result');
        expect(resultElement).toHaveClass('O-won');
        expect(screen.getByText('O')).toBeInTheDocument();
    });

    it('should have correct class for a tie', () => {
        getPlayerSymbolSpy.mockReturnValueOnce('T');
        renderComponent({ result: TIED });
        expect(getPlayerSymbolSpy).toHaveBeenCalledWith(TIED);
        const resultElement = screen.getByText('T');
        expect(resultElement).toHaveClass('local-board-result');
        expect(resultElement).toHaveClass('T-won');
        expect(screen.getByText('T')).toBeInTheDocument();
    });
});