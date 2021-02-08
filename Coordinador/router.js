const express = require("express");
const router = express.Router();

const metodosRouter = require("./modules/metodos/metodos.router");

//Rutas base para los módulos del proyecto

router.use("/metodos", metodosRouter);

module.exports = router;
