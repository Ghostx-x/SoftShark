import pool from "../database/db.js";

export const ProjectModel = {
    async create(name, description) {
        const {rows: exists} = await pool.query("SELECT id FROM projects WHERE name=$1", [name]);
        if (exists.length) throw new Error("Project name already exists");

        const {rows} = await pool.query(
            "INSERT INTO projects(name, description) VALUES($1,$2) RETURNING *",
            [name, description]
        );
        return rows[0];
    }
}