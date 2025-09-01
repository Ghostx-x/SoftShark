import { dataSource } from "../database/data_source.js";
import { Project } from "../entities/projects_entity.js";
import { ILike } from "typeorm";
import { ProjectNotFound, ValidationError } from "../errors/error_class.js";
const projectRepo = dataSource.getRepository(Project);
export const ProjectModel = {
    async create(data) {
        try {
            const project = projectRepo.create(data);
            return await projectRepo.save(project);
        }
        catch (err) {
            throw new ValidationError(err.message);
        }
    },
    async list({ q, offset = 0, limit = 10 }) {
        const where = q
            ? [{
                    name: ILike(`%${q}%`)
                }, { description: ILike(`%${q}%`) }]
            : {};
        const data = await projectRepo.find({ where, order: { created_at: "DESC" },
            skip: offset, take: limit });
        return { limit, offset, data };
    },
    async getById(id) {
        const project = await projectRepo.findOne({ where: { id } });
        if (!project)
            throw new ProjectNotFound();
        return project;
    },
};
