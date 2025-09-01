import { dataSource } from '../database/data_source.js';
import { Task, TaskStatus } from '../entities/tasks_entity.js';
import { User } from '../entities/users_entity.js';
import { Project } from '../entities/projects_entity.js';
import { TaskNotFound, UserNotFound, ProjectNotFound, InvalidTaskStatusError } from '../errors/error_class.js';

export class TaskModel {
    private taskRepo = dataSource.getRepository(Task);
    private userRepo = dataSource.getRepository(User);
    private projectRepo = dataSource.getRepository(Project);

    async create(title: string, project_id: number, status: string, due_date?: Date, assigned_to?: number): Promise<Task> {
        const project = await this.projectRepo.findOne({ where: { id: project_id } });
        if (!project) throw new ProjectNotFound();

        let assignedUser: User | null = null;
        if (assigned_to) {
            assignedUser = await this.userRepo.findOne({ where: { id: assigned_to } });
            if (!assignedUser) throw new UserNotFound();
        }

        let allowedStatus = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
        const normalizedStatus = status.toLowerCase().trim() as TaskStatus;
        if (!allowedStatus.includes(normalizedStatus)) throw new InvalidTaskStatusError();

        const task = this.taskRepo.create({title, project, status: normalizedStatus,
            due_date, assigned_to: assignedUser});

        return await this.taskRepo.save(task);
    }

    async list(project_id?: number, status?: string, due_date?: Date): Promise<Task[]> {
        const query = this.taskRepo.createQueryBuilder('task')
            .leftJoinAndSelect('task.assigned_to', 'user')
            .leftJoinAndSelect('task.project', 'project');

        if (project_id) query.andWhere('task.project_id = :project_id', { project_id });
        if (status) query.andWhere('task.status = :status', { status: status.toLowerCase().trim() });
        if (due_date) query.andWhere('task.due_date = :due_date', { due_date });

        return await query
            .orderBy('task.due_date', 'ASC')
            .addOrderBy('task.created_at', 'DESC')
            .getMany();
    }

    async detail(task_id: number): Promise<Task> {
        const task = await this.taskRepo.findOne({
            where: { id: task_id },
            relations: ['assigned_to', 'project', 'comments'],
        });
        if (!task) throw new TaskNotFound();
        return task;
    }

    async updateAssign(task_id: number, new_assigned_to: number): Promise<Task> {
        const task = await this.taskRepo.findOne({ where: { id: task_id } });
        if (!task) throw new TaskNotFound();

        const user = await this.userRepo.findOne({ where: { id: new_assigned_to } });
        if (!user) throw new UserNotFound();

        task.assigned_to = user;
        return await this.taskRepo.save(task);
    }
}