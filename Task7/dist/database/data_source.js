import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();
export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: ['./dist/entities/*.js'],
    migrations: ['./dist/migrations/*.js'],
});
