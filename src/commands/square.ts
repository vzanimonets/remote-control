import {down, left, mouse, Point, right, up} from "@nut-tree/nut-js";

export const drawSquare = async (position: Point, args: string) => {
    const w = parseInt(args);

    await mouse.drag(left(w));
    await mouse.drag(down(w));
    await mouse.drag(right(w));
    await mouse.drag(up(w));
};