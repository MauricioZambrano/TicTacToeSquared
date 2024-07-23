import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LocalTicTacToeBoard, LocalTicTacToeBoardProps } from '../LocalTicTacToeBoard';
import { RowCol } from '../../../store/slices/gameSlice';
import { array_mapper } from '../../../utils/constants';

jest.mock('../Square', () => ({
    Square: ({ bigBoardRC, localBoardRC }: { bigBoardRC: RowCol; localBoardRC: RowCol }) => (
        <div data-testid={`square-${localBoardRC.row}-${localBoardRC.col}`}>
            {`Square: ${localBoardRC.row},${localBoardRC.col}`}
        </div>
    ),
}));

describe('LocalTicTacToeBoard component', () => {
    const setup = (bigBoardRC: RowCol) => {
        const props: LocalTicTacToeBoardProps = { bigBoardRC };
        return render(<LocalTicTacToeBoard {...props} />);
    };

    it('should render without crashing', () => {
        setup({ row: 0, col: 0 });
        expect(screen.getByTestId('square-0-0')).toBeInTheDocument();
    });

    it('should render the correct number of Square components', () => {
        setup({ row: 0, col: 0 });
        const squares = screen.getAllByText(/Square: \d,\d/);
        expect(squares).toHaveLength(array_mapper.length * array_mapper.length);
    });

    it('should pass the correct props to each Square component', () => {
        const bigBoardRC = { row: 1, col: 1 };
        setup(bigBoardRC);

        array_mapper.forEach((_, localRow) => {
            array_mapper.forEach((_, localCol) => {
                const square = screen.getByTestId(`square-${localRow}-${localCol}`);
                expect(square).toHaveTextContent(`Square: ${localRow},${localCol}`);
            });
        });
    });
});
