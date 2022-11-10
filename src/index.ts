import ReconnectingWebSocket from 'reconnecting-websocket';

import { Options } from 'reconnecting-websocket/dist/reconnecting-websocket';

import qs from 'qs';

export enum ListenerTypes {
    open,
    message,
    close
}

export class WebSocketGameLobbyClient {
    rws: any;

    keepAliveInterval: number;

    debug: boolean;

    constructor({
        port = 80,
        options = {
            maxRetries: 10
        },
        gameId,
        gameCode,
        playerId,
        keepAliveMilliseconds = 30000,
        debug = false
    }: {
        port?: number;
        options?: Options;
        gameId?: string;
        gameCode?: string;
        playerId?: string;
        keepAliveMilliseconds?: number;
        debug?: boolean;
    }) {
        this.debug = debug;
        this.rws = new ReconnectingWebSocket(
            `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${
                window.location.hostname
            }${port && port !== 80 ? `:${port}` : ''}?${qs.stringify(
                {
                    gameId: gameId || null,
                    gameCode: gameCode || null,
                    playerId: playerId || null
                },
                { skipNulls: true }
            )}`,
            [],
            options
        );

        this.keepAliveInterval = setInterval(
            () => this.rws.send('ping'),
            keepAliveMilliseconds
        );
    }

    addEventListener(type: string, callback: () => void): void {
        if (type in ListenerTypes) {
            this.rws.addEventListener(type, callback);
        }
    }

    removeEventListener(type: string, callback: () => void): void {
        if (type in ListenerTypes) {
            this.rws.removeEventListener(type, callback);
        }
    }

    send<T = any>(
        type: string,
        {
            gameId,
            gameCode,
            playerId,
            custom,
            ...rest
        }: {
            gameId?: string;
            gameCode?: string;
            playerId?: string;
            custom?: T;
        } = {}
    ): void {
        const payload = {
            type,
            gameId,
            gameCode,
            playerId,
            custom,
            ...rest
        };
        if (this.debug) console.log(payload);
        this.rws.send(JSON.stringify(payload));
    }
}
