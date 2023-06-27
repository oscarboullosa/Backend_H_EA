import logger from "pino";
import dayjs from "dayjs";
import prettifier from "pino-pretty";

const log = logger({
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;