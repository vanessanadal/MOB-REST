require("dotenv").config();
var express = require('express');
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const parseRequestBody = require("./middleware/parseRequestBody");
const logRoute = require("./middleware/logRoute");

const router = require("./router.js");

/*var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');*/

// Admitir comunicaciones a través de la red con Cors
app.use(cors());

// Configuración de elementos de optimización y seguridad
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logger que indica cuándo se hizo una petición y a qué URL
app.use(logRoute.setLog);

// Router de la aplicación, con la ruta base de la API
app.use("/ServidorReplicacion/", parseRequestBody.convertToSnakeCase, router);

// Error 404 en caso de ir a una ruta no especificada
app.use(logRoute.notFoundLog);

module.exports = app;
