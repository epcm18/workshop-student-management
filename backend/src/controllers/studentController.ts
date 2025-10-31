import { Request, Response } from "express";
import { StudentService } from "../services/studentService";

export class StudentController {
  static async addNewStudent(req: Request, res: Response) {
    try {
      const savedStudent = await StudentService.addNewStudent(req);
      res.status(201).json(savedStudent);
    } catch (error) {
      console.error("Error adding a new student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getAllStudents(req: Request, res: Response) {
    try {
      const students = await StudentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      console.error("Error getting all students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async editStudent(req: Request, res: Response) {
    // TODO: Implement edit student
  }

  static async deleteStudent(req: Request, res: Response) {
    // TODO: Implement delete student
  }
}
