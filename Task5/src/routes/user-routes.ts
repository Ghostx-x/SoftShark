import { Router } from "express";
import { UserController } from "../controllers/user-controller";

const router = Router();

router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.patch("/:id", UserController.patchUser);
router.delete("/:id", UserController.deleteUser);

export default router;
