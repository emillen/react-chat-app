const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token, "asdasd", function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    next();
  });
};

const invalidUrlMiddleware = (req, res, next) => {
  res.status(404).send({ message: "404 not found" });
};

module.exports = {
  authenticationMiddleware,
  invalidUrlMiddleware
};
