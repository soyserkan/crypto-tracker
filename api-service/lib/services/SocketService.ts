import { Server } from "socket.io"
import * as http from 'http'

class SocketService {
    private _io?: Server;

    get io() {
        if (!this._io) {
            throw new Error('Cannot access socket channel before connecting');
        }

        return this._io;
    }
    connect(server: http.Server) {
        this._io = new Server(server, {
            cors: {
                origin: process.env.SOCKET_CLIENT_SERVER,
                methods: ["GET", "POST"]
            }
        })
        this._io.on('connection', () => console.log('Web socket connection created'))
    }
}
export const socketService = new SocketService();
