const express = require("express");
const router = express.Router();

const clienteRouter = require("./modules/cliente/cliente.router");

//Rutas base para los módulos del proyecto

router.use("/cliente", clienteRouter);

module.exports = router;
