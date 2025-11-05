import express from "express";

import {
  _deleteUser,
  _getAllUsers,
  _getUser,
  _updateUser,
  registerUser,
} from "./user-controller.js";

const userRouter = express.Router();

userRouter.post("/", registerUser); // create user

userRouter.get("/get-user/:userId", _getUser); // get a user

userRouter.get("/get-users", _getAllUsers); // get all users

userRouter.delete("/delete/:userId", _deleteUser); // soft delete a user

userRouter.patch("/update/:userId", _updateUser); // update a user

export default userRouter;
