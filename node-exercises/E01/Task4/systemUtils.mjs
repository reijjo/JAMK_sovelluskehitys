// const os = require("os");
import os from "os";

export const formatSystemInfo = () => {
  const data = {
    uptime: `${os.uptime()} seconds`,
    totalMemory: `${os.totalmem()} MB`,
  };

  return JSON.stringify(data);
};
