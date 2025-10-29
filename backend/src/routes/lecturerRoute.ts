import express from "express";
import { LecturerController } from "../controllers/lecturerController";

const router = express.Router();

router.post("/add", LecturerController.addNewLecture);
router.get("/allLecturers", LecturerController.getAllLecturers);

export default router;
