const os = require("os");

const formatSystemInfo = () => {
  const data = {
    uptime: `${os.uptime()} seconds`,
    totalMemory: `${os.totalmem()} MB`,
  };

  return JSON.stringify(data);
};

module.exports = { formatSystemInfo };
