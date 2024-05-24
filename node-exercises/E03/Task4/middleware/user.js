const checkUser = (req, res, next) => {
  const user = req.query.user;

  if (!user) {
    return res.status(401).json({ success: false, msg: "Unauthorized" });
  }
  next();
};

module.exports = checkUser;
