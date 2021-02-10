const express = require("express");
const router = express.Router();
const clienteController = require("./cliente.controller");


// Manipulación de datos del usuario 
router.post("/replicar",clienteController.replicar);
/*
router.get("/consultar",clienteController.consultar);
router.post("/crear",clienteController.crear);
router.delete("/eliminar",clienteController.eliminar);

router.post("/restaurar",clienteController.restaurar);*/


module.exports = router;