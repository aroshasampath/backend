import express from "express";
import Student from "../models/student.js";
import { createStudent, getStudent } from "../controllers/studentController.js";
const studentRouter = express.Router();

studentRouter.get("/" ,getStudent);

studentRouter.post("/" ,createStudent);
    
export default studentRouter;