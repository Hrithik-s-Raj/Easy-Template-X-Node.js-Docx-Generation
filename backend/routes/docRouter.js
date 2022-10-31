import express from "express";
import { addDetail, getDetail } from "../controllers/docController.js";
const router = express.Router();

router.get("/", getDetail).post("/", addDetail);

export default router;
