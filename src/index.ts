import { httpServer } from './http_server';
import { createWebSocketStream, WebSocketServer } from 'ws';
import { down, left, mouse, right, up } from '@nut-tree/nut-js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires

const HTTP_PORT = 8181;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const wss = new WebSocketServer({ port: 8080, host: 'localhost' });
//const nut =  new Nut();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

wss.on('connection', async function connection(ws: any) {
  console.log('WS is connect');
  const stream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
  //
  // stream.on('data', async (data) => {
  //   console.log(data.toString());
  // });
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
    //console.log(msg.toString());
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
        const position = await mouse.getPosition();
        const cmd = `mouse_position ${+position.x}px,${+position.y}px`;
        stream.write(cmd);
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

