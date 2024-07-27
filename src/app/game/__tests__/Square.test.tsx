import React from 'react';
import * as reactRedux from 'react-redux';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../../../test-utils';
import { Square } from '../Square';
import { Player } from '../../../utils/constants';
import { playSquare, changePlayer } from '../../../store/slices/gameSlice';
import { AppDispatch } from '../../../store/store';
import '@testing-library/jest-dom';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

const bigBoardRC = { row: 0, col: 0 };
const localBoardRC = { row: 0, col: 0 };

describe('<Square />', () => {
    let mockDispatch: AppDispatch;

    beforeEach(() => {
        jest.clearAllMocks();
        mockDispatch = jest.fn();
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);
    });

    it('should display "X" when Player 1 has played', () => {
        jest.spyOn(reactRedux, 'useSelector').mockReturnValue(Player.PLAYER_1);
        render(<Square bigBoardRC={bigBoardRC} localBoardRC={localBoardRC} />);
        expect(screen.getByText('X')).toBeInTheDocument();
    });

    it('should display "O" when Player 2 has played', () => {
        jest.spyOn(reactRedux, 'useSelector').mockReturnValue(Player.PLAYER_2);
        render(<Square bigBoardRC={bigBoardRC} localBoardRC={localBoardRC} />);
        expect(screen.getByText('O')).toBeInTheDocument();
    });

    it('should be empty when no player has played', () => {
        jest.spyOn(reactRedux, 'useSelector').mockReturnValue(undefined);
        render(<Square bigBoardRC={bigBoardRC} localBoardRC={localBoardRC} />);
        expect(screen.getByRole('button')).toBeEmptyDOMElement();
    });

    it('should dispatch playSquare and changePlayer actions on click when the square is empty', () => {
        let selectorCallCount = 0;
        jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => {
            selectorCallCount++;
            if (selectorCallCount === 1) return undefined; // useCurrentSquare
            if (selectorCallCount === 2) return true; // useIsCurrentBigSquare
            return undefined; // useIsLocalGameFinished
        });

        render(<Square bigBoardRC={bigBoardRC} localBoardRC={localBoardRC} />);

        fireEvent.click(screen.getByRole('button'));

        expect(mockDispatch).toHaveBeenCalledWith(playSquare({ bigBoardRC, localBoardRC }));
        expect(mockDispatch).toHaveBeenCalledWith(changePlayer());
    });

    it('should not dispatch any actions on click when the square is not empty', () => {
        let selectorCallCount = 0;
        jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => {
            selectorCallCount++;
            if (selectorCallCount === 1) return Player.PLAYER_2; // useCurrentSquare
            if (selectorCallCount === 2) return false; // useIsCurrentBigSquare
            return undefined; // useIsLocalGameFinished
        });

        render(<Square bigBoardRC={bigBoardRC} localBoardRC={localBoardRC} />);

        fireEvent.click(screen.getByRole('button'));

        expect(mockDispatch).not.toHaveBeenCalled();
    });
});