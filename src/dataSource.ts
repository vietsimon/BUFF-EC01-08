import { DataSource } from "typeorm";
import CustomerEntity from "./entity/CustomerEntity";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "172.104.167.232",
    port: 8201,
    username: "postgres",
    password: "Nintendo123",
    database: "buff-vn-server",
    synchronize: true,
    logging: false,
    entities: [CustomerEntity],
    subscribers: [],
    migrations: [],
});

export let BuffVnDataSource: DataSource = {} as any;

export const BuffVnDataSourceInit = async () => {
    BuffVnDataSource = await AppDataSource.initialize();
}
