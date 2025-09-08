import { dataSource } from "../database/data_source";
import { Project } from "../entities/projects_entity";
import { ILike } from "typeorm";
import { ProjectNotFound, ValidationError } from "../errors/error_class.js";

const projectRepo = dataSource.getRepository(Project);


export const ProjectModel = {
    async create(data: object): Promise<object> {
        try {
            const project: object = projectRepo.create(data);
            return await projectRepo.save(project);
        } catch (err: any) {
            throw new ValidationError(err.message);
        }
    },

    async list(params: { q?: string; offset?: number; limit?: number }): Promise<object> {
        const { q, offset = 0, limit = 10 } = params;

        const where = q
            ? [{ name: ILike(`%${q}%`) }, { description: ILike(`%${q}%`) }]
            : {};

        const data: object[] = await projectRepo.find({
            where,
            order: { created_at: "DESC" },
            skip: offset,
            take: limit,
        });

        return { limit, offset, data };
    },

    async getById(id: number): Promise<object | null> {
        const project: object | null = await projectRepo.findOne({ where: { id } });
        if (!project) throw new ProjectNotFound();
        return project;
    },
};
