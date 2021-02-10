const logger = require("../../config/logger");
var createError = require("http-errors");


module.exports = {

    ReplicarObjetos: async function (req, res, next) {
        console.log(req.body);
        console.log("hacer replicar");
        res.json({});
    }

}