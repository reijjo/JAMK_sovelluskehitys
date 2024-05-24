const notFound = (_req, res) => res.status(404).send("Unknown endpoint");
module.exports = notFound;
