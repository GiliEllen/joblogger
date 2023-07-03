import express from "express";
import {
  getAllUsers,
  login,
  register,
  getUserById,
  getUser,
  logout
} from "./usersCtrl";

const router = express.Router();

router
  .get("", getAllUsers)
  .get("/get-user-by-cookie", getUser)
  .get("/get-user-by-cookie/:userId", getUserById)
  .get("/logout", logout)
  .get("/:id", getUserById)
  .post("/login", login)
  .post("/register", register);

export default router;
