import * as gameReducers from '../../../store/slices/gameSlice';
import { render, screen, fireEvent } from '@testing-library/react';
import { Square, SquareProps } from '../Square';
import { Player } from '../../../utils/constants';
import '@testing-library/jest-dom';

const playSquareSpy = jest.spyOn(gameReducers, 'playSquare');
const changePlayerSpy = jest.spyOn(gameReducers, 'changePlayer');

describe('<Square />', () => {
    const setup = (player: Player | null) => {
        const bigBoardRC = { row: 0, col: 0 };
        const localBoardRC = { row: 0, col: 0 };
        const props: SquareProps = { bigBoardRC, localBoardRC };

        return render(<Square {...props} />);
    };

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
        setup(Player.PLAYER_1);

        fireEvent.click(screen.getByRole('button'));

        expect(playSquareSpy).not.toHaveBeenCalled();
        expect(changePlayerSpy).not.toHaveBeenCalled();
    });
});
