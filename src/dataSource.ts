import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "172.104.167.232",
    port: 8202,
    username: "postgres",
    password: "Nintendo123",
    database: "buff-vn-server",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
}).initialize()