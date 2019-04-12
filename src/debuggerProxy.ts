import { Socket } from 'net';
import { EventEmitter } from 'events';
//import { resolve } from 'path';

/**
 * Class to contact the fs-UAE GDB server.
 */
export class DebuggerProxy extends EventEmitter {

    /** Socket to connect */
    private socket: Socket;
	constructor(socket?: Socket) {
        super();
        if (socket) {
            this.socket = socket;
        } else {
            this.socket = new Socket();
        }
    }
    /**
     * Function to connect to the server
     * @param host Server host
     * @param port Server socket port
     */
    public connect(host: string, port: number): Promise<void> {
        let self = this;
        return new Promise((resolve, reject) => {
            self.socket.connect(port, host);
            self.socket.once('connect', async () => {
            });
            self.socket.on('error', (err) => {
             //   self.sendEvent("error", err);
                reject(err);
            });
            self.socket.on("data", async (data) => { await this.onData(this, data); });
        });
    }

	public send( input_string: string )
	{
        let data = Buffer.alloc(input_string.length + 1);
        let offset = 0;
		data.write( input_string );
        offset += input_string.length;
        data.writeInt8(0, offset);

		this.socket.write(data);
	}
    /**
     * Method to destroy the connection.
     */
    public destroy(): void {
        this.socket.destroy();
    }
	/*
     * Prepares a string to be send: checksum + start char
     * @param text Text to be sent
     */
    public formatString(text: string): Buffer {
        let data = Buffer.alloc(text.length + 5);
        let offset = 0;
        data.write('$', offset++);
        data.write(text, offset);
        offset += text.length;
        data.write('#', offset++);
        //data.write(GdbProxy.calculateChecksum(text), offset);
        offset += 2;
        data.writeInt8(0, offset);
        return data;
    }

    /**
     * Method to precess the generics messages
     * @param proxy A GdbProxy istance
     * @param data Data to parse
     */
    private onData(proxy: DebuggerProxy, data: any): Promise<void> {
        return new Promise(async (resolve, reject) => {

			let s = data.toString();
			console.log( s );
            resolve();
        });
    }
}

