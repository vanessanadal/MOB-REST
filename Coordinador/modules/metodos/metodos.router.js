const express = require("express");
const router = express.Router();
const metodosController = require("./metodos.controller");


// Manipulación de datos del usuario 

router.post("/ReplicarObjetos",metodosController.ReplicarObjetos);
/*router.post("/RestaurarObjetos",metodosController.RestaurarObjetos);
router.post("/HacerReplica",metodosController.HacerReplica);
router.post("/RecibirObjetos",metodosController.RecibirObjetos);*/



module.exports = router;