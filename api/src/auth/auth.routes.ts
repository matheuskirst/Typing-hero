import { container } from "tsyringe";
import AuthController from "./auth.controller.ts";
import express, { type Express } from "express";
import { validateData } from "../middleware/validateData.ts";
import { LoginSchema, SignupSchema } from "./auth.schemas.ts";


const authController = container.resolve(AuthController);
const authRoutes = express.Router();

authRoutes.post('/login', validateData(LoginSchema), authController.login);
authRoutes.post('/signup', validateData(SignupSchema), authController.signup);

export default authRoutes
