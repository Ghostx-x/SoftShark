import pool from "../database/db.js";

export const TaskModel = {
    async create(title, project_id, status, due_date, assigned_to) {

        const { rows : projectIdExists } = await pool.query("SELECT id FROM projects WHERE id = $1", [project_id]);
        if (projectIdExists.length === 0) throw new Error("Project id doesn't exist");

        if(assigned_to) {
            const { rows : users } = await pool.query("SELECT username FROM users WHERE username = $1", [assigned_to]);
            if(users.length === 0) throw new Error("User with that name doesn't exist");
        }

        const allowedStatus = ['todo', 'in_progress', 'done'];
        status = status.toLowerCase().trim();
        if (!allowedStatus.includes(status)) throw new Error("Invalid status");

        const today = new Date().toISOString().split("T")[0];
        if(due_date < today) console.warn("Warning: due_date is in the past");

        const { rows } = await pool.query(
            "INSERT INTO tasks(title, project_id, status, due_date, assigned_to) VALUES($1,$2,$3,$4,$5) RETURNING *",
            [title, project_id, status, due_date, assigned_to || null]
        );
        return rows[0];
    }
}