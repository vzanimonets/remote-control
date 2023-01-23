import { mouse, Point, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';
//TODO: needed to fix problem with write-down part of screen

const printScreen = async (position: Point) => {
  try {
    // const position = await mouse.getPosition();
    // console.log('position x', position.x);
    // console.log('width:', await screen.width());
    // console.log('position y:', position.y);
    // console.log('height:', await screen.height());
    const delta = 100;
    const screenW = await screen.width();
    const screenH = await screen.height();

    const left = position.x - delta > 0 ? position.x - delta : 0;
    const top = position.y - delta > 0 ? position.y - delta : 0;
    const width = delta * 2; //<= screenW ? position.x + delta*2 : screenW;
    const height = delta * 2; //<= screenH ? position.y + delta*2 : screenH;
    // const startX = 300;
    // const startY = 300;
    // const endX = 200;
    // const endY = 200;
    const regionToGrab = new Region(left, top, width, height);
    const image = await screen.grabRegion(regionToGrab);
    const jimp = new Jimp({
      data: image.data,
      width: image.width,
      height: image.height
    });
    const base64Image = await jimp.getBase64Async(Jimp.MIME_PNG);

    await screen.highlight(regionToGrab);
    return base64Image.replace('data:image/png;base64,', '');
  } catch (e) {
    process.stdout.write('position error!');
  }
};

const drawCircle = async (position: Point, radius: number) => {
  const newPoint = [];
  //Loop through each step of the circle
  for (let angle = 0; angle < 360; angle++) {
    const x = position.x + radius * Math.cos((angle * Math.PI) / 180) - radius;
    const y = position.y + radius * Math.sin((angle * Math.PI) / 180);
    newPoint.push({ x, y });
  }
  await mouse.drag(newPoint);
};
export {printScreen, drawCircle}