import jwt from "jsonwebtoken";
import Promise from "bluebird";

const verify = Promise.promisify(jwt.verify);

export const authenticationMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  verify(token, "asdasd")
    .then(() => next())
    .catch(err =>
      res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." })
    );
};

export const invalidUrlMiddleware = (_, res) => {
  res.status(404).send({ message: "404 not found" });
};
