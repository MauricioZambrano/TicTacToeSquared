import { Tied } from "@/store/slices/gameSlice";

export const GRID_SIZE = 3;
export enum Player {
    PLAYER_1 = 1,
    PLAYER_2 = 2
}

export const TIED = 'tied' as Tied;

export const array_mapper = Array.from({ length: 3 });