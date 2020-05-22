# websocket-game-lobby-client

> 🔧 Simple API for building games using WebSockets.

[![NPM Version](http://img.shields.io/npm/v/websocket-game-lobby-client.svg?style=flat)](https://www.npmjs.org/package/websocket-game-lobby-client)

## Install

```bash
$ npm install websocket-game-lobby-client
```

## Example

```javascript
import { WebSocketGameLobbyClient } from 'websocket-game-lobby-client';

const gameLobby = new WebSocketGameLobbyClient();

gameLobby.addEventListener('message', ({ data }) => {
    console.log(JSON.parse(data));
});

document
    .querySelector('button')
    .addEventListener('click', () => gameLobby.send('create'));
```

## API

### WebSocketGameLobbyClient

```javascript
const gameLobby = new WebSocketGameLobbyClient({
    port = 80,
    options = {maxRetries: 10},
    gameId = null,
    gameCode = null,
    playerId = null,
    keepAliveMilliseconds = 3000
});
```

#### Options

| Name                    | Description                                                                                                      | Default            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------ |
| `port`                  | Port to connect to WebSocket server.                                                                             | `80`               |
| `options`               | Options to send to [reconnecting-websocket](https://github.com/pladaria/reconnecting-websocket)                  | `{maxRetries: 10}` |
| `gameId`                | Game ID used to connect to the [websocket-game-lobby](https://github.com/neogeek/websocket-game-lobby) server.   | `null`             |
| `gameCode`              | Game Code used to connect to the [websocket-game-lobby](https://github.com/neogeek/websocket-game-lobby) server. | `null`             |
| `playerId`              | Player ID used to connect to [websocket-game-lobby](https://github.com/neogeek/websocket-game-lobby) server.     | `null`             |
| `keepAliveMilliseconds` | Interval at which to ping the [websocket-game-lobby](https://github.com/neogeek/websocket-game-lobby) server.    | `30000`            |

### WebSocketGameLobbyClient.addEventListener(type, callback)

#### Type

| Name      | Description                                 | Parameters           |
| --------- | ------------------------------------------- | -------------------- |
| `open`    | When a WebSocket connection is established. | `(event)`            |
| `message` | When a message is received.                 | `({data, ...event})` |
| `close`   | When a WebSocket connection is lost.        | `(event)`            |

#### Examples

```javascript
gameLobby.addEventListener('open', () => {
    console.log('connected');
});
gameLobby.addEventListener('message', ({ data }) => {
    console.log(JSON.parse(data));
});
gameLobby.addEventListener('open', () => {
    console.log('disconnected');
});
```

### WebSocketGameLobbyClient.send(type, data)

#### Type

| Name     | Description                        |
| -------- | ---------------------------------- |
| `create` | Create a new game.                 |
| `join`   | Join existing game with game code. |
| `leave`  | Leave current game.                |
| `start`  | Start current game.                |
| `end`    | End current game.                  |

#### Examples

```javascript
gameLobby.send('create');
gameLobby.send('join', { gameCode: 'ABCD' });
gameLobby.send('leave');
gameLobby.send('start');
gameLobby.send('end');
```
