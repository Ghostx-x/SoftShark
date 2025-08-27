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
    },

    async list(project_id, status, due_date) {
        const query = `SELECT * FROM tasks WHERE project_id = $1
        AND ($2::text IS NULL OR status = $2)
        AND ($3::date IS NULL OR due_date = $3) ORDER BY due_date NULLS LAST, created_at DESC`;

        const values = [project_id, status || null, due_date || null];
        const { rows } = await pool.query(query, values);
        return rows;
    },

    async detail(task_id) {
        const { rows } = await pool.query(
            `SELECT 
            t.id,
            t.title,
            t.status,
            t.due_date,
            t.created_at,
            u.username AS assigned_to,
            p.id AS project_id,
            p.name,
            COUNT(c.id) AS comment_count
        FROM tasks t
        LEFT JOIN users u ON t.assigned_to = u.username
        LEFT JOIN projects p ON t.project_id = p.id
        LEFT JOIN comments c ON t.id = c.task_id
        WHERE t.id = $1
        GROUP BY t.id, u.username, p.id`,
            [task_id]
        );
        if (rows.length === 0) throw new Error("Task not found");
        return rows[0];
    },

    async updateAssign(id, new_assigned_to) {
        const { rows : taskExists } = await pool.query("SELECT id FROM tasks WHERE id = $1", [id]);
        if (taskExists.length === 0) throw new Error("Task id doesn't exist");

        const { rows : users } = await pool.query("SELECT username FROM users WHERE username = $1", [new_assigned_to]);
        if(users.length === 0) throw new Error("User with that name doesn't exist");

        const { rows : result } = await pool.query("UPDATE tasks SET assigned_to = $1, updated_at = NOW() WHERE id = $2 RETURNING id, title, assigned_to, updated_at", [new_assigned_to, id])

        return result[0];

    }

}