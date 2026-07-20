// user.routes.js
import { Router } from "express";
import userController  from "../controller/user.controllers.js";
import {validate} from "../middlewares/validation.middlewares.js";
import {userSchema} from "../schema/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/", validate(userSchema) ,  userController.createUserController);
router.post("/login", userController.loginUserController);

router.use(authMiddleware); 
router.get("/", userController.findAllUserController);
router.get("/:id", userController.findByIdController)
router.patch("/:id", userController.updateUserController)
router.delete("/:id", userController.deleteUserController)


export default router;
