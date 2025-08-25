import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/swagger/swagger.js";
import projectRoutes from "./src/routes/project_routes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/projects", projectRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(8080, () => {
    console.log('Running on port 8080')
})

