import "reflect-metadata";
import express, { Application } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './swagger/swagger.js';
import projectRoutes from './routes/project_routes.js';
import {dataSource} from "./database/data_source";
import taskRoutes from "./routes/task_routes";
import userRoutes from "./routes/user_routes";



dotenv.config()
await dataSource.initialize();
const app = express()
app.use(express.json())

app.use('/projects', projectRoutes)
app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

swaggerDocs(app)
app.listen(8080, () => {
    console.log('Running on port 8080')
})

