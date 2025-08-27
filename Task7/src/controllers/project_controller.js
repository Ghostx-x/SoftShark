import { ProjectModel } from "../models/project_models.js";

export const ProjectController = {
    async create(req, res) {
        const { name, description } = req.body;
        try {
            const project = await ProjectModel.create(name, description);
            res.json(project);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async list(req, res) {
        try {
            const { q, offset = 0, limit = 10 } = req.query;
            const projects = await ProjectModel.list({
                q,
                offset: parseInt(offset, 10),
                limit: parseInt(limit, 10)
            });
            res.json(projects);
        } catch (err) {
        }
    }

}