import { RowCol } from "@/store/slices/gameSlice";
import { GRID_SIZE } from "./constants";
import classNames from "classnames";

export const getSquareClassname = (sq: RowCol): string => {
    return classNames({
        'top-border': sq.row !== 0,
        'bottom-border': sq.row !== GRID_SIZE - 1,
        'left-border': sq.col !== 0,
        'right-border': sq.col !== GRID_SIZE - 1
    });
};