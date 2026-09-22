const net = require('net');

const APP_ID = '1377783621775130694';
const SOCKET = '/var/folders/ns/zg5vqfxn3qg9qndj_n2xdbzm0000gn/T/discord-ipc-0';
const ACTIVITY = {
  timestamps: { start: Date.now() }
};

function encode(op, data) {
  const json = JSON.stringify(data);
  const buf = Buffer.alloc(8 + json.length);
  buf.writeUInt32LE(op, 0);
  buf.writeUInt32LE(json.length, 4);
  buf.write(json, 8);
  return buf;
}

function connect() {
  const socket = net.createConnection(SOCKET);

  socket.on('connect', () => {
    console.log('Connected to Discord');
    socket.write(encode(0, { v: 1, client_id: APP_ID }));
  });

  socket.on('data', (data) => {
    const json = JSON.parse(data.slice(8).toString());
    console.log('Received:', json.evt);

    if (json.evt === 'READY') {
      socket.write(encode(1, {
        cmd: 'SET_ACTIVITY',
        args: { pid: process.pid, activity: ACTIVITY },
        nonce: '1'
      }));
      console.log('Activity set');
    }
  });

  socket.on('error', (err) => {
    console.log('Error:', err.message);
    console.log('Retrying in 5 seconds...');
    setTimeout(connect, 5000);
  });

  socket.on('close', () => {
    console.log('Connection closed, retrying...');
    setTimeout(connect, 5000);
  });
}

connect();