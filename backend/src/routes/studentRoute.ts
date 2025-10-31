import express from "express";
import { StudentController } from "../controllers/studentController";

const router = express.Router();

router.post("/add", StudentController.addNewStudent);
router.get("/allStudents", StudentController.getAllStudents);
// TODD: Implement routes for the edit and delete APIs

export default router;
