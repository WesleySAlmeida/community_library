// user.routes.js
import { Router } from "express";
import {createUserController}  from "../controller/user.controllers.js";

const router = Router();
router.post("/users", createUserController);

export default router;
