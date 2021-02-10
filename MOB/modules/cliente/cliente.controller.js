const logger = require("../../config/logger");
var createError = require("http-errors");
var io = require("socket.io-client");

module.exports = {

    replicar: async function (req, res, next) {
        console.log(req.body);
        
        console.log('1'); // Connect to server 
        const socket = io("http://localhost:3030"); 
        console.log('2'); // Add a connect listener 
    
        socket.on('connect', () => 
        { 
        socket.emit('data', req.body);
        socket.disconnect();
        }); 
        console.log('3');

        res.json({});

    }
}