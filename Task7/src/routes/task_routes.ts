import express from "express";
import { TaskController } from "../controllers/task_controller";
import { validate } from "../middleware/validation_handler";
import { createTaskSchema, listTasksSchema, updateAssignSchema } from "../validations/task_validator";

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
*     summary: Create a new task
*     tags: [Tasks]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - title
*               - project_id
*               - status
*               - due_date
*             properties:
*               title:
*                 type: string
*                 description: Title of the task
*               project_id:
*                 type: integer
*                 description: ID of the project this task belongs to
*               status:
*                 type: string
*                 enum: [todo, in_progress, done]
*                 description: Status of the task
*               due_date:
*                 type: string
*                 format: date
*                 description: Due date of the task
*               assigned_to:
*                 type: integer
*                 description: ID of the user assigned to this task
*     responses:
*       201:
*         description: Task created successfully
*       400:
*         description: Validation error
*       500:
*         description: Internal server error
*/
router.post("/", validate(createTaskSchema), TaskController.createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: List tasks with optional filters
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: project_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter by project ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [todo, in_progress, done]
 *         required: false
 *         description: Filter by task status
 *       - in: query
 *         name: due_date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Filter by due date
 *     responses:
 *       200:
 *         description: List of tasks
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.get("/", validate(listTasksSchema, "query"), TaskController.listTasks);

/**
 * @swagger
 * /tasks/{task_id}:
 *   get:
 *     summary: Get task details by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: task_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task details
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.get("/:task_id", TaskController.getTaskDetails);

/**
 * @swagger
 * /tasks/assign:
 *   patch:
 *     summary: Assign a task to a user
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task_id
 *               - assigned_to
 *             properties:
 *               task_id:
 *                 type: integer
 *                 description: ID of the task to update
 *               assigned_to:
 *                 type: integer
 *                 description: ID of the user to assign the task to
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation error (missing task_id or assigned_to)
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.patch("/assign", validate(updateAssignSchema), TaskController.updateAssignedToField);


export default router;
