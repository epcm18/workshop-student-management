import express from "express";
import { StudentController } from "../controllers/studentController";

const router = express.Router();

router.post("/add", StudentController.addNewStudent);
router.get("/allStudents", StudentController.getAllStudents);

export default router;
