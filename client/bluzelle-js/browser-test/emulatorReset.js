const WebSocketServer = require('websocket').server;
const reset = require('emulator/Emulator').reset;


const ws = new WebSocketServer(8101);

ws.onmessage = async () => {

	await reset();

	ws.send();

};