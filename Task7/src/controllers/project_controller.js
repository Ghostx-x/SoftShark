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
    }
}