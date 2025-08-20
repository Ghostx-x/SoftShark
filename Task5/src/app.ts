import express from "express";
import { dataSource } from "./config/data-source";
import userRoutes from "./routes/user-routes";

const app = express();
app.use(express.json());

dataSource
    .initialize()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Error occurred while connecting to database", err);
    });

app.use("/users", userRoutes);

app.listen(8080, () => {
    console.log("Running on port 8080");
})

export default app;