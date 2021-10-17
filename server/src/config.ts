/** @format */

import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import express from 'express';

export const app = express();
export const server = createServer(app);
export const wss = new WebSocketServer({ server });
export const HOST = process.env.NODE_HOST;
export const PORT = process.env.NODE_PORT || process.env.PORT;
