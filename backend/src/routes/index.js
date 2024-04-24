import express from "express";
import users from "./api/v1/users/index.js";
import csrf from "./api/v1/index.js";
const rootRouter = express.Router();

rootRouter.use("/api/v1/users", users);
rootRouter.use("/api/v1", csrf);

export default rootRouter;
