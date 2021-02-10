const logger = require("../../config/logger");
var createError = require("http-errors");
var io = require("socket.io-client");

module.exports = {

    replicar: async function (req, res, next) {
        console.log(req.body);
        
        console.log('Cliente llama a metodo REPLICAR'); // Connect to server 
        const socket = io("http://localhost:3030"); 
    
        socket.on('connect', () => 
        { 
        socket.emit('data', req.body);
        socket.disconnect();
        }); 
        console.log('MOB se conecta a Coordinador');

        res.json({});

    }
}