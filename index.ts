import { httpServer } from './src/http_server/index.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mouse } from '@nut-tree/nut-js';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
