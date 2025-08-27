import express from "express";
import { ProjectController } from "../controllers/project_controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a new project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "My First Project" }
 *               description: { type: string, example: "A sample project" }
 *     responses:
 *       200: { description: Project created successfully }
 *       400: { description: Invalid request }
 */
router.post("/", ProjectController.create);

/**
 * @swagger
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: List projects (supports search & pagination)
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Projects fetched successfully }
 *       400: { description: Invalid request }
 */
router.get("/", ProjectController.list);

export default router
