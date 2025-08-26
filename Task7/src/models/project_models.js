import pool from "../database/db.js";

export const ProjectModel = {
    async create(name, description) {
        const {rows: exists} = await pool.query("SELECT id FROM projects WHERE name=$1", [name]);
        if (exists.length) throw new Error("Project name already exists");

        const {rows} = await pool.query(
            "INSERT INTO projects(name, description) VALUES($1,$2) RETURNING * ",
            [name, description]
        );
        return rows[0];
    },

    async list({q, offset, limit=10}) {
        const values = [];
        let where = '';

        if(q) {
            where = 'WHERE name ILIKE $1 OR description ILIKE $1';
            values.push(`%${q}%`)
        }

        values.push(offset);
        values.push(limit);

        let query = `SELECT id, name, description, created_at FROM projects ${where} 
                    ORDER BY created_at DESC 
                    LIMIT $${values.length} OFFSET $${values.length - 1}`;

        const { data } = await pool.query(query, values);
        return { limit, offset, data };
    }
}