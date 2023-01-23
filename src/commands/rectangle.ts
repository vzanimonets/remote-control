import {down, left, mouse, Point, right, up} from '@nut-tree/nut-js';

export const drawRectangle = async (position: Point, args: string) => {
    const [width, height] = args;
    const w = parseInt(width);
    const h = parseInt(height);

    await mouse.drag(left(h));
    await mouse.drag(down(w));
    await mouse.drag(right(h));
    await mouse.drag(up(w));
};