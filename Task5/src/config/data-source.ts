import { DataSource } from 'typeorm'
import {User} from "../entities/user.entity"

export const dataSource = new DataSource({
    type : "postgres",
    host: 'localhost',
    port: 5432,
    username: 'natali',
    password: '8409',
    database: 'firstdb',
    entities: [User],
    migrations: ['src/migrations/*.ts']
})