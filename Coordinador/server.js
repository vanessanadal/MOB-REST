const app = require("./app");
const logger = require("./config/logger");
const port = 3030;
const http = require('http').Server(app);
var io = require('socket.io')(http);
var io_client = require("socket.io-client");

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
                      console.log('Client disconnected.' + data.fecha + " " + data.nombre+ " "  + data.accion);
                      var f = data.fecha;
                      var n = data.nombre;
                      var a = data.accion;

                      var replica = { fecha: f, nombre: n, accion: a}
                      
                      ReplicarObjetos(replica);
                    
                    });
            });

         //Funcion que llame a servidor replicas con sockets
         
         function ReplicarObjetos(replica) {
         
          const socket = io_client("http://localhost:3050"); 
         
          socket.on('connect', () => 
          { 
          socket.emit('data', replica);
          socket.disconnect();
          }); 
          console.log('Coordinador se conecta con Servidor de Replicas');
         }
        
         
       