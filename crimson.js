const net = require('net');

const SOCKET = '/var/folders/ns/zg5vqfxn3qg9qndj_n2xdbzm0000gn/T/discord-ipc-0';

function encode(op, data) {
  const json = JSON.stringify(data);
  const buf = Buffer.alloc(8 + json.length);
  buf.writeUInt32LE(op, 0);
  buf.writeUInt32LE(json.length, 4);
  buf.write(json, 8);
  return buf;
}

socket.on('connect', () => {
  console.log('Connected');
  socket.write(encode(0, {
    v: 1,
    client_id: '1479320468090519593'
  }));
});

socket.on('data', (data) => {
  const json = JSON.parse(data.slice(8).toString());
  console.log('Received:', JSON.stringify(json));

  if (json.evt === 'READY') {
    socket.write(encode(1, {
      cmd: 'SET_ACTIVITY',
      args: {
        pid: process.pid,
        activity: {
          timestamps: { start: Date.now() }
        }
      },
      nonce: '1'
    }));
  }
});

socket.on('error', console.error);
