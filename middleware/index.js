import jwt from "jsonwebtoken";
import Promise from "bluebird";
import User from "../models/User";
import mongoose from "mongoose";

const verify = Promise.promisify(jwt.verify);
const ObjectId = mongoose.Types.ObjectId;

export const authenticationMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  verify(token, "asdasd")
    .then(decoded =>{ req.decoded = decoded; User.findOne({ _id: new ObjectId(decoded.id) })})
    .then(user => {
      if (user === null) return Promise.reject();
      else {
				return user
			};
    })
    .then(() => next())
    .catch(error =>
      res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate token.", error })
    );
};

export const invalidUrlMiddleware = (_, res) => {
  res.status(404).send({ message: "404 not found" });
};
