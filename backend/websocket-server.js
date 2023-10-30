const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3002 });

wss.on('connection', ws => {
    console.log('New client connected');

    ws.on('message', message => {
        console.log(`Received message: ${message}`);
    });

    ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on port 3002');