import express from "express";
import { TaskController } from "../controllers/task_controller.js";

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finish documentation
 *               project_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: [todo, in_progress, done]
 *                 example: in_progress
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-09-01
 *               assigned_to:
 *                 type: string
 *                 example: john_doe
 *             required:
 *               - title
 *               - project_id
 *               - status
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer, example: 1 }
 *                 title: { type: string, example: Finish documentation }
 *                 project_id: { type: integer, example: 1 }
 *                 status: { type: string, example: in_progress }
 *                 due_date: { type: string, format: date }
 *                 assigned_to: { type: string, example: john_doe }
 *                 created_at: { type: string, format: date-time }
 *       400:
 *         description: Invalid input (project/user doesn't exist, invalid status, etc.)
 */
router.post("/", TaskController.create);


/**
* @swagger
* /tasks:
*   get:
*     summary: Get the list of all tasks
*     parameters:
*       - in: query
*         name: project_id
*         schema:
*           type: integer
*         required: true
*       - in: query
*         name: status
*         schema:
*           type: string
*         required: false
*       - in: query
*         name: date_due
*         schema:
*           type: string
*           format: date
*         required: false
*     responses:
*       200:
*         description: Task listed successfully
*         content:
*           application/json:
*             schema:
    *               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
    *                     type: integer
*                     example: 1
*                   title:
*                     type: string
*                     example: Finish documentation
*                   project_id:
*                     type: integer
*                     example: 1
*                   status:
*                     type: string
*                     example: in_progress
*                   due_date:
*                     type: string
*                     format: date
*                   assigned_to:
*                     type: string
*                     example: john_doe
*                   created_at:
*                     type: string
*                     format: date-time
*       400:
*         description: Error
*/
router.get("/", TaskController.list);
export default router
