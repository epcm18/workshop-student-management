import express from "express";
import { StudentController } from "../controllers/studentController";

const router = express.Router();

// Create a new student
router.post("/add", StudentController.addNewStudent);
router.get("/allStudents", StudentController.getAllStudents);
router.put("/edit/:id", StudentController.editStudent);
router.delete("/delete/:id", StudentController.deleteStudent);

export default router;
