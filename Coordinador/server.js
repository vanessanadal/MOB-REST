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
             socket.on('REPLICAR', function(data) { // 'data' eso era lo que pasaba
                      console.log(data);

                      var replica = data;
                      
                      ReplicarObjetos(replica);
                    
                    });
            });

         //Ahora en replicarObjetos el Coordinador es Cliente y Servidor de replicas es Servidor
         
         function ReplicarObjetos(replica) {
         
          const socket = io_client("http://localhost:3050"); 

         
          socket.on('connect', () => 
          { 
          socket.emit('data', replica);
          socket.disconnect();
          }); 
          console.log('Coordinador hace VOTE_REQUEST');


         }
        
         
       