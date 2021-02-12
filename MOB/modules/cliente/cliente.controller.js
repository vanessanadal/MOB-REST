const logger = require("../../config/logger");
var createError = require("http-errors");
var io = require("socket.io-client");
const fs = require("fs");
//const xml2js = require("xml2js");
const util = require ("util");
module.exports = {
  
  consultar: async function (req, res, next) {
    try {
        var parser = require("xml2json");
        let obj;

        console.log('Cliente llama a metodo Consultar'); 
        
        fs.readFile('bd.xml', (err, data) => {
        obj = JSON.parse(parser.toJson(data, { reversible: true })).objetos.objeto;
        console.log("Objetos: ", obj)
        res.status(200).json(obj);
        });
}
   catch (e) {
        res.status(500).send({
          message: "Error al consultar objetos ",
        });
        next(e);
      } 

},

    crear: async function (req, res, next) {
        try {
            console.log(req.body);
            console.log('Cliente llama a metodo CREAR'); 
            var parser = require("xml2json");

         fs.readFile('bd.xml', (err, data) => {

            obj = JSON.parse(parser.toJson(data, { reversible: true }));

            console.log("Objetos actuales: ", obj.objetos)

            if (obj.objetos && obj.objetos.objeto[1]) {
                obj.objetos.objeto.push(req.body);
              } 
            else { if (obj.objetos && obj.objetos.objeto) {
                  obj = {
                    objetos: {
                      objeto: [{
                          nombre: obj.objetos.objeto.nombre,
                          fecha: obj.objetos.objeto.fecha,
                          accion: obj.objetos.objeto.accion, }, req.body, ], },  };
                 } else {
                  obj = {
                    objetos: {
                      objeto: [req.body], }, }; }
                }

              obj = parser.toXml(obj, { reversible: true });
              fs.writeFile('bd.xml', obj, () => {});
            });

        res.status(200).json({message: "Se creo correctamente el objeto"});
    }
       catch (e) {
            res.status(500).send({
              message: "Error en la creacion del objeto",
            });
            next(e);
          } 

    },

    eliminar: async function (req, res, next) {
        try {
            console.log('Cliente llama a metodo Eliminar'); // Connect to server 
            var parser = require("xml2json");
            fs.readFile('bd.xml', (err, data) => {
            obj = JSON.parse(parser.toJson(data, { reversible: true }));
            obj.objetos.objeto.forEach((objeto, i) => {
                  if ( objeto.nombre.$t === req.body.nombre.$t && objeto.fecha.$t === req.body.fecha.$t && objeto.accion.$t === req.body.accion.$t) {
                    obj.objetos.objeto.splice(i, 1);
                    obj = parser.toXml(obj, { reversible: true });

                    //Sobreescribe el nuevo contenido en el archivo xml
                    fs.writeFile("bd.xml", obj, () => {});
                    res.status(200).json({ message: "Se borro correctamente el objeto"});
                  }
              });
            });
    }
       catch (e) {
            res.status(500).send({
              message: "Error en la eliminacion del objeto",
            });
            next(e);
          } 

    },


    replicar: async function (req, res, next) {
       try{
         console.log("Objeto recibido:"  + req.body);
        let replica;
        var parser = require("xml2json");
        
        fs.readFile('bd.xml', (err, data) => {
          obj = JSON.parse(parser.toJson(data, { reversible: true }));

              console.log(obj)
              console.log('Cliente llama a metodo REPLICAR'); 
              const socket = io("http://localhost:3030"); 
              
              replica = { accion: req.body.accion, objetos: obj, tipo:"replica"}

              console.log('MOB se conecta a Coordinador');
              socket.on('connect', () => 
              { 
              socket.emit('REPLICAR', replica);
              socket.disconnect();
              }); 
              console.log('MOB llamando a ReplicarObjetos en Coordinador');

          });

          res.status(200).json({ message: "Se hizo la replica satisfactoriamente"});
       }
       catch (e) {
        res.status(500).send({
          message: "Error en la replicacion. Se abortaran los cambios",
        });
        next(e);
      } 

    },

   /* restaurar: async function (req, res, next) {
      console.log("Objeto recibido:"  + req.body);
      let restauracion = { tipo:"restauracion"}
      var parser = require("xml2json");
      
      fs.readFile('bd.xml', (err, data) => {
        obj = JSON.parse(parser.toJson(data, { reversible: true }));

            console.log(obj)
            console.log('Cliente llama a metodo REStAURAR'); 
            const socket = io("http://localhost:3030"); 
            
            replica = { accion: req.body.accion, objetos: obj}

            console.log('MOB se conecta a Coordinador');
            socket.on('connect', () => 
            { 
            socket.emit('REPLICAR', replica);
            socket.disconnect();
            }); 
            console.log('MOB llamando a RestaurarObjetos en Coordinador');

        });
      res.json({});
  }

  */
}