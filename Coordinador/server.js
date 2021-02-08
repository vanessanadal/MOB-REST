const app = require("./app");
const logger = require("./config/logger");
const port = 3030;

// El servidor levanta la aplicación
app.listen(port, () => {
  logger.info({
    message: `App listening`,
  });
});
