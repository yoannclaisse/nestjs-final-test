import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Task } from "./entity/Task"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 24000,
    username: "postgres",
    password: "postgres",
    database: "nestjs-final-test-db",
    synchronize: true,
    logging: false,
    entities: [User, Task],
    migrations: [],
    subscribers: [],
})
