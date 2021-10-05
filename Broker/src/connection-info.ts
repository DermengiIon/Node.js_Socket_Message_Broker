import { Socket } from 'net';

export interface ConnectionInfo {
  topic?: string;
  socket?: Socket;
  remoteAddress?: string;
  remotePort?: number;
}
