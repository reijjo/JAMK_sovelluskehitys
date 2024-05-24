const jwt = require("jsonwebtoken");
// const { APIError } = require("./errors/custom");

const checkUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("authhread", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    // throw new APIError("No token in header.", 401);
    // console.error("No token in header");
    return res.status(404).json({ success: false, msg: "No token in header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { user } = decoded;

    console.log("user", user);

    req.user = { user };
    next();
  } catch (error) {
    // console.log("Error decoding token");
    return res.status(401).json({ success: false, msg: "Unauthorized" });
  }
};

module.exports = checkUser;
