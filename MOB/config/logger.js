const { createLogger, format, transports } = require("winston");

// Formato del logger, estructura del mensaje y colores

module.exports = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format((level) => {
          level.level = level.level.toUpperCase();
          return level;
        })(),
        format.colorize({ colors: { info: "blue" } }),
        format.timestamp({
          format: "YY-MM-DD hh:mm:ss",
        }),
        format.ms(),
        format.printf((level) => {
          let message;
          message = `[${level.timestamp}] | ${level.level} | ${level.ms} | ${level.message}`;
          return message;
        })
      ),
    }),
    new transports.File({
      filename: "combined.log",
      level: "info",
      format: format.combine(
        format((level) => {
          level.level = level.level.toUpperCase();
          return level;
        })(),
        format.colorize({ colors: { info: "blue" } }),
        format.timestamp({
          format: "YY-MM-DD hh:mm:ss",
        }),
        format.ms(),
        format.printf((level) => {
          let message;
          message = `[${level.timestamp}] | ${level.level} | ${level.ms} | ${level.message}`;
          return message;
        })
      ),
    }),
  ],
});
