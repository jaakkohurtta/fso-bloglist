const config = require("./server/utils/config");
const app = require("./app");
const http = require("http");
const logger = require("./server/utils/logger");

const server = http.createServer(app);

const PORT = config.PORT || 3001;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
