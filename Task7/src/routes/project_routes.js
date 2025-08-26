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

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects (paginated + search)
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Search keyword (matches name or description)
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *         description: Number of records to return per page
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *         description: Number of records to skip
 *     responses:
 *       200:
 *         description: Paginated list of projects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginationResponse'
 *
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: My First Project }
 *         description: { type: string, example: A sample project }
 *         created_at: { type: string, format: date-time }
 *     PaginationResponse:
 *       type: object
 *       properties:
 *         limit: { type: integer, example: 10 }
 *         offset: { type: integer, example: 0 }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Project'
 */
router.get("/", ProjectController.list);

export default router
