import express from "express";
import { ProjectController } from "../controllers/project_controller.js";

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: My First Project
 *               description:
 *                 type: string
 *                 example: A sample project
 *     responses:
 *       200:
 *         description: Project created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", ProjectController.create);

export default router
