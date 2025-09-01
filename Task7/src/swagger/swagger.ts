// src/swagger.ts
import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Project & Task API', version: '1.0.0' },
    },
    apis: ['./dist/routes/*.js'], // use JS files, not TS
};


const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
