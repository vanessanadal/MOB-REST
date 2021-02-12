const app = require("./app");
const logger = require("./config/logger");
const port = 3050;
const http = require('http').Server(app);
var io = require('socket.io')(http);
var io_client = require("socket.io-client");
var parser = require("xml2json");
const fs = require("fs");

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
                      console.log(data);
                      var accion = data.accion.$t;
                      var obj = data.objetos;

                      if(accion=="commit"){
                        console.log('Servidor de replicas envio VOTE_COMMIT');
                        console.log('Creando REPLICA...');
                        obj = parser.toXml(obj, { reversible: true });
                        fs.writeFile("replica.xml", obj, () => {});
                        console.log('¡REPLICA creada exitosamente!');
                      } else {
                        console.log('Se envio VOTE_ABORT');
                        console.log('No se ha creado la replica pues se encontro un VOTE_ABORT');
                      }
                      

                    });
                 });



        
