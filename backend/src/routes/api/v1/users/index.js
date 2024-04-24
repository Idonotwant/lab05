import { Router } from "express";
import {
  getContent,
  createContent,
  modContent,
  deleteContent,
  login,
  getOneUser,
  createOneUser,
} from "./handlers.js";
import multer from "multer";
const upload = multer();
const router = Router();
router.get("/content", getContent);
router.post("/createContent", createContent);
router.post("/modContent", modContent);
router.post("/deleteContent", deleteContent);
router.post(`/login`, login);
router.post(`/`, upload.single("picture"), createOneUser);
router.get(`/:id`, getOneUser);
export default router;
