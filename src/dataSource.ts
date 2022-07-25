import { DataSource } from "typeorm";
import CategoryEntity from "./entity/CategoryEntity";
import CustomerEntity from "./entity/CustomerEntity";
import DefineDataEntity from "./entity/DefineDataEntity";
import ManagerEntity from "./entity/ManagerEntity";
import OrderEntity from "./entity/OrderEntity";
import OrderProductEntity from "./entity/OrderProductEntity";
import ProductEntity from "./entity/ProductEntity";
import SizeProductEntity from "./entity/SizeProductEntity";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "172.104.167.232",
    port: 8201,
    username: "postgres",
    password: "Nintendo123",
    database: "buff-vn-server",
    synchronize: true,
    logging: false,
    entities: [
        CustomerEntity,
        CategoryEntity,
        DefineDataEntity,
        ProductEntity,
        SizeProductEntity,
        ManagerEntity,
        OrderEntity,
        OrderProductEntity
    ],
    subscribers: [],
    migrations: [],
});

export let BuffVnDataSource: DataSource = {} as any;

export const BuffVnDataSourceInit = async () => {
    BuffVnDataSource = await AppDataSource.initialize();
}
