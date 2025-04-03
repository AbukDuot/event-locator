let io;

/**
 * Initialize Socket.IO
 * @param {Object} server - HTTP server instance
 */
const initializeRealtime = (server) => {
  const socketIo = require('socket.io');
  io = socketIo(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};

/**
 * Emit a real-time event
 * @param {String} event - Event name
 * @param {Object} data - Event data
 */
const emitEvent = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};

module.exports = {
  initializeRealtime,
  emitEvent,
};