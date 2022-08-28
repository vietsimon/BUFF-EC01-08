import { DataSource } from "typeorm";
import BlogCategoryEntity from "./entity/BlogCategoryEntity";
import BlogEntity from "./entity/BlogEntity";
import BrandEntity from "./entity/BrandEntity";
import CategoryEntity from "./entity/CategoryEntity";
import ColorEntity from "./entity/ColorEntity";
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
        BlogEntity,
        BlogCategoryEntity,
        DefineDataEntity,
        ProductEntity,
        ColorEntity,
        SizeProductEntity,
        ManagerEntity,
        OrderEntity,
        OrderProductEntity,
        BrandEntity
    ],
    subscribers: [],
    migrations: [],
});

export let BuffVnDataSource: DataSource = {} as any;

export const BuffVnDataSourceInit = async () => {
    BuffVnDataSource = await AppDataSource.initialize();
}
