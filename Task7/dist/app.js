import express from 'express';
import dotenv from 'dotenv';
import { swaggerDocs } from './swagger/swagger.js';
import projectRoutes from './routes/project_routes.js';
import { dataSource } from './database/data_source.js';
dotenv.config();
const app = express();
app.use(express.json());
async function startServer() {
    try {
        await dataSource.initialize();
        console.log('Database connected successfully');
        app.use('/projects', projectRoutes);
        // app.use('/tasks', taskRoutes)
        swaggerDocs(app);
        app.listen(8080, () => {
            console.log('Server running on port 8080');
            console.log('Swagger docs: http://localhost:8080/api-docs');
        });
    }
    catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
}
startServer();
