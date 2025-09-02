import express from "express";
import { UserController } from "../controllers/user_controllers";
import { validate } from "../middleware/validation_handler";
import { createUserSchema } from "../validations/user_validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               required:
 *                 - username
 *               properties:
 *                 username:
 *                   type: string
 *                 profession:
 *                   type: string
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     profession:
 *                       type: string
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", validate(createUserSchema), UserController.createUser);

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:user_id", UserController.getUserById);

export default router;
