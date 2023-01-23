import { httpServer } from './http_server';
import { createWebSocketStream, WebSocketServer } from 'ws';
import {Button, down, left, mouse, right, up} from '@nut-tree/nut-js';
import {drawCircle, printScreen} from './commands';

const HTTP_PORT = 8181;

const wss = new WebSocketServer({ port: 8080, host: 'localhost' });

wss.on('connection', async function connection(ws: any) {
  console.log('WS is connect');
  const stream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  stream.on('data', async (msg: any) => {
    // Parse the message from JSON to object
    /*
            commands:
                     mouse_position   -"p"

                     mouse_left 10 - "arrow left"
                     mouse_right 10 - "arrow right"
                     mouse_up 10 - "arrow up"
                     mouse_down 10 - "arrow down"

                     draw_circle [radius] - "c"
                     draw_square [figure_length] - "s"
                     draw_rectangle [height][width] - "r"
             */
    const [command, x, y, ...args] = msg.toString().split(' ');
    // console.log(msg.toString().split(' '));
    console.log(msg.toString());
    const position = await mouse.getPosition();
    switch (command) {
      case 'mouse_left':
        await mouse.move(left(parseInt(x)));
        stream.write(`mouse_left ${x} px`);
        break;
      case 'mouse_right':
        await mouse.move(right(parseInt(x)));
        stream.write(`mouse_right ${x} px`);
        break;
      case 'mouse_up':
        await mouse.move(up(parseInt(x)));
        stream.write(`mouse_up ${x} px`);
        break;
      case 'mouse_down':
        await mouse.move(down(parseInt(x)));
        stream.write(`mouse_down ${x} px`);
        break;
      case 'mouse_position':
        const cmd = `mouse_position ${position.x},${position.y}`;
        stream.write(cmd);
        break;
      case 'draw_circle':
        await drawCircle(position,x);
        break;
      case 'draw_square':
        console.log('draw square', position);
        break;
      case 'draw_rectangle':
        break;
      case 'prnt_scrn':
        const base64Image = await printScreen(position);
        if (base64Image) {
          stream.write(`prnt_scrn ${base64Image}`);
        }
        break;
      default:
        break;
    }
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

process.on('SIGINT', () => {
  process.stdout.write('Closing websocket...\n');
  wss.close();
  process.exit(0);
});

