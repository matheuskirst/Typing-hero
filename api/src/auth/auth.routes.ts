import express, { type Express } from "express";
import AuthController from "./auth.controller.ts";

const authRoutes = express.Router();
const authController = new AuthController

authRoutes.post('/login', authController.login);
authRoutes.post('/signup', authController.signup);

export default authRoutes
