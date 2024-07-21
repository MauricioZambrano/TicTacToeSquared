import * as gameReducers from '../../../store/slices/gameSlice';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { Square, SquareProps } from '../Square';
import { Player } from '../../../utils/constants';
import { RootState } from '../../../store/store';
import '@testing-library/jest-dom';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

const mockDispatch = useDispatch as unknown as jest.Mock;
const mockUseSelector = useSelector as unknown as jest.Mock;

const playSquareSpy = jest.spyOn(gameReducers, 'playSquare');
const changePlayerSpy = jest.spyOn(gameReducers, 'changePlayer');

describe('<Square />', () => {
    const setup = (player: Player | null) => {
        const bigBoardRC = { row: 0, col: 0 };
        const localBoardRC = { row: 0, col: 0 };
        const props: SquareProps = { bigBoardRC, localBoardRC };

        mockDispatch.mockReturnValue(jest.fn());
        mockUseSelector.mockImplementation((callback: (state: RootState) => Player | null) => {
            return callback({} as RootState);
        });

        mockUseSelector.mockReturnValue(player);

        return render(<Square {...props} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render without crashing', () => {
        setup(null);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    it('should display "X" when Player 1 has played', () => {
        setup(Player.PLAYER_1);
        expect(screen.getByText('X')).toBeInTheDocument();
    });
    it('should display "O" when Player 2 has played', () => {
        setup(Player.PLAYER_2);
        expect(screen.getByText('O')).toBeInTheDocument();
    });
    it('should be empty when no player has played', () => {
        setup(null);
        expect(screen.getByRole('button')).toBeEmptyDOMElement();
    });
    it('should dispatch playSquare and changePlayer actions on click when the square is empty', () => {
        setup(null);

        fireEvent.click(screen.getByRole('button'));

        expect(playSquareSpy).toHaveBeenCalledWith({ bigBoardRC: { row: 0, col: 0 }, localBoardRC: { row: 0, col: 0 } });
        expect(changePlayerSpy).toHaveBeenCalled();
    });
    it('should not dispatch any actions on click when the square is not empty', () => {
        const mockDispatchFn = jest.fn();
        mockDispatch.mockReturnValue(mockDispatchFn);
        setup(Player.PLAYER_1);

        fireEvent.click(screen.getByRole('button'));

        expect(mockDispatchFn).not.toHaveBeenCalled();
    });
});
