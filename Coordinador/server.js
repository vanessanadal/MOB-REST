const app = require("./app");
const logger = require("./config/logger");
const port = 3030;
const http = require('http').Server(app);
var io = require('socket.io')(http);

// El servidor levanta la aplicación
http.listen(port, () => {
  logger.info({
    message: `App listening`,
  });
});

io = io.listen(http);

        io.sockets.on('connection', function(socket) {
             console.log('Client connected.', socket.handshake.address); 
             socket.on('data', function(data) { // 'data' eso era lo que pasaba
                      console.log('Client disconnected.' + data.fecha + " " + data.nombre+ " "  + data.accion); });
         });

         //Funcion que llame a servidor replicas con sockets
         //