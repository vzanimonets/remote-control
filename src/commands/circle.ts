import {mouse, Point} from "@nut-tree/nut-js";

export const drawCircle = async (position: Point, radius: number) => {
    const newPoint = [];
    //Loop through each step of the circle
    for (let angle = 0; angle < 360; angle++) {
        const x = position.x + radius * Math.cos((angle * Math.PI) / 180) - radius;
        const y = position.y + radius * Math.sin((angle * Math.PI) / 180);
        newPoint.push({ x, y });
    }
    await mouse.drag(newPoint);
};