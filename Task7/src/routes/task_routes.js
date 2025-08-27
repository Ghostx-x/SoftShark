import express from "express";
import { TaskController } from "../controllers/task_controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags:
 *       - Tasks
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
 *
 *       400:
 *         description: Invalid input (project/user doesn't exist, invalid status, etc.)
 */
router.post("/", TaskController.create);


/**
* @swagger
* /tasks:
*   get:
*     tags:
*       - Tasks
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
*
*       400:
*         description: Error
*/
router.get("/", TaskController.list);

/**
 * @swagger
 * /tasks/{task_id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get detailed info about selected task
 *     description: Returns a task along with its assignee, project details, and number of comments
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task
 *     responses:
 *       200:
 *         description: Task detail fetched successfully
 *
 *       400:
 *         description: Invalid request
 */
router.get("/:task_id", TaskController.details)


/**
 * @swagger
 * /tasks/{task_id}/assign:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Update the assignee
 *     description: Updates the assigned user for a task and returns the updated task
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_assigned_to:
 *                 type: string
 *                 example: john_doe
 *             required:
 *               - new_assigned_to
 *     responses:
 *       200:
 *         description: Task assigned successfully
 *
 *       400:
 *         description: Invalid request (task or user not found)
 */

router.patch("/:task_id/assign", TaskController.updateAssign);


export default router
