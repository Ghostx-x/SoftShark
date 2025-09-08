import { dataSource } from '../database/data_source';
import { Task, TaskStatus } from '../entities/tasks_entity';
import { User } from '../entities/users_entity';
import { Project } from '../entities/projects_entity';
import { TaskNotFound, UserNotFound, ProjectNotFound, InvalidTaskStatusError } from '../errors/error_class';

const taskRepo = dataSource.getRepository(Task);
const userRepo = dataSource.getRepository(User);
const projectRepo = dataSource.getRepository(Project);
export const TaskModel = {


    async create(title: string, project_id: number, status: string, due_date?: Date, assigned_to?: number): Promise<Task> {
        const project: object | null = await projectRepo.findOne({ where: { id: project_id } });
        if (!project) throw new ProjectNotFound();

        let assignedUser: User | null = null;
        if (assigned_to) {
            assignedUser = await userRepo.findOne({ where: { id: assigned_to } });
            if (!assignedUser) throw new UserNotFound();
        }

        let allowedStatus = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
        const normalizedStatus = status.toLowerCase().trim() as TaskStatus;
        if (!allowedStatus.includes(normalizedStatus)) throw new InvalidTaskStatusError();

        const task: object = taskRepo.create({title, project, status: normalizedStatus,
            due_date, assigned_to: assignedUser});

        return await taskRepo.save(task);
    },

    async list(filters: { project_id?: number; status?: string; due_date?: Date } = {}): Promise<Task[]> {
        const { project_id, status, due_date } = filters;
        const where: any = {};

        if (status) where.status = status.toLowerCase().trim();
        if (due_date) where.due_date = due_date;
        if (project_id) where.project = { id: project_id };

        return await taskRepo.find({
            where,
            relations: ['assigned_to', 'project'],
            order: { due_date: 'ASC', created_at: 'DESC' },
        });
    },



    async detail(task_id: number): Promise<object | null> {
        const task: object | null = await taskRepo.findOne({
            where: { id: task_id },
            relations: ['assigned_to', 'project', 'comments'],
        });
        if (!task) throw new TaskNotFound();
        return task;
    },

    async updateAssignedToField(task_id: number, new_assigned_to: number): Promise<object | null> {
        const task: object | null = await taskRepo.findOne({ where: { id: task_id } });
        if (!task) throw new TaskNotFound();

        const user: object | null = await userRepo.findOne({ where: { id: new_assigned_to } });
        if (!user) throw new UserNotFound();

        (task as any).assigned_to = user;
        return await taskRepo.save(task);
    }
}