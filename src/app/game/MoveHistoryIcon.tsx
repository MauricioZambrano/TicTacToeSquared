import React from 'react';
import classNames from 'classnames';
import { RowCol } from '@/store/slices/gameSlice';
import { Player, array_mapper } from '@/utils/constants';
import { getSquareClassname } from '@/utils/gameHelpers';
import './styles/moveHistoryIcon.scss';

export interface MoveHistoryIconProps {
    rowCol: RowCol;
    player: Player;
}

export const MoveHistoryIcon = (props: MoveHistoryIconProps) => {
    const { rowCol, player } = props;

    const getSquareClass = (row: number, col: number): string => {
        const classes = classNames(
            'square',
            getSquareClassname({ row: row, col: col }),
            {
                'selected-square': rowCol.row === row && rowCol.col === col,
                'is-player-one': player === Player.PLAYER_1,
                'is-player-two': player === Player.PLAYER_2,
            }
        );
        console.log(`For rowcol`)

        return classes;
    }

    return (
        <div className='small-board'>
            {array_mapper.map((_, localRow) => (
                <div className="small-row" key={localRow} >
                    {array_mapper.map((_, localCol) => (
                        <div className={getSquareClass(localRow, localCol)} />
                    ))}
                </div>
            ))}
        </div>
    )
};