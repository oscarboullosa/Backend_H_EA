import pino from "pino";
import dayjs from "dayjs";
import prettifier from "pino-pretty";

const log = pino({
  prettifier,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;