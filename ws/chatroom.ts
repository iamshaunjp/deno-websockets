import { WebSocket, isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let sockets = new Map<string, WebSocket>(); 

interface BroadcastObj {
  name: string,
  mssg: string,
}

// broadcast events to clients
const broadcastEvent = (obj: BroadcastObj) => {
  sockets.forEach((ws: WebSocket) => {
    ws.send(JSON.stringify(obj));
  });
}

const chatConnection = async (ws: WebSocket) => {
  // add new ws connection to map
  const uid = v4.generate();
  sockets.set(uid, ws);

  // listen for websocket events
  for await (const ev of ws) {
    console.log(ev);

    // delete socket if connection closed
    if (isWebSocketCloseEvent(ev)) {
      sockets.delete(uid);
    }
    
    // create ev object if ev is string
    if (typeof ev === 'string') {
      let evObj = JSON.parse(ev.toString());
      broadcastEvent(evObj);
    }

  }

};

export { chatConnection };