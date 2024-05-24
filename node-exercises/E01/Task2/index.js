const os = require("os");

const getOs = () => {
  console.log("System uptime:", os.uptime());
  console.log("Total memory:", os.totalmem());
  console.log("Platform:", os.platform());
  console.log("CPU arc:", os.arch());
};

getOs();
