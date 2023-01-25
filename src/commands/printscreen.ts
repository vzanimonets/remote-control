import {Point, Region, screen} from '@nut-tree/nut-js';
import Jimp from 'jimp';

export const printScreen = async (position: Point) => {
    try {
        const delta = 100;
        const screenW = await screen.width();
        const screenH = await screen.height();

        const left = position.x - delta > 0 ? position.x - delta : 0;
        const top = position.y - delta > 0 ? position.y - delta : 0;
        const width = delta * 2;
        const height = delta * 2;

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