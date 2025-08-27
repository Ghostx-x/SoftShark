import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/swagger/swagger.js";
import projectRoutes from "./src/routes/project_routes.js";
import task_routes from "./src/routes/task_routes.js";
import { swaggerDocs } from "./src/swagger/swagger.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/tasks", task_routes);

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

swaggerDocs(app);
app.listen(8080, () => {
    console.log('Running on port 8080')
})

