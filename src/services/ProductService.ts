import { BuffVnDataSource } from "../dataSource";
import ProductEntity from "../entity/ProductEntity";
import { CreateProductType, UpdateProductType } from "../type/ProductType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";

export default class ProductService {
    public async GetProductById(id: number) {
        let result = await BuffVnDataSource.getRepository(ProductEntity).findOneBy({
            id
        });
        return result;
    }

    public async GetProductByKey(key: string) {
        let result = await BuffVnDataSource.getRepository(ProductEntity).findOneBy({
            key
        });
        return result;
    }

    public async GetAllProduct() {
        let data = await BuffVnDataSource.createQueryBuilder(ProductEntity, "lv1")
            .leftJoin(ProductEntity, 'lv2', `lv2."parentId" = lv1.id`)
            .leftJoin(ProductEntity, 'lv3', `lv3."parentId" = lv2.id`)
            .leftJoin(ProductEntity, 'lv4', `lv4."parentId" = lv3.id`)
            .select(`lv1.id`)
            .addSelect(`lv1.key`)
            .addSelect(`lv1.name`)
            .addSelect(`lv2.id`)
            .addSelect(`lv2.key`)
            .addSelect(`lv2.name`)
            .addSelect(`lv3.id`)
            .addSelect(`lv3.key`)
            .addSelect(`lv3.name`)
            .addSelect(`lv4.id`)
            .addSelect(`lv4.key`)
            .addSelect(`lv4.name`)
            .execute();
        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data
        }
        return result;
    }

    public async CreateProduct(data: CreateProductType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!data?.name) {
            result.status = false
            result.errors.push("Tên không được rỗng")
        }
        if (!data?.key) {
            result.status = false
            result.errors.push("Từ khóa không được rỗng")
        }
        if (!result.status) return result;

        // data.key=Common.replaceAccents( data.name);
        let Product = new ProductEntity({
            key: data.key,
            name: data.name,
            description: data.description,
            images: data.images,
            updatedAt: new Date(),
            createdAt: new Date(),
            status: "active",
        })

        await BuffVnDataSource.getRepository(ProductEntity).save(Product);
        return result;
    }

    public async UpdateProduct(data: UpdateProductType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!data?.id) {
            result.status = false
            result.errors.push("Mã không được rỗng")
        }

        if (!data?.name) {
            result.status = false
            result.errors.push("Tên không được rỗng")
        }
        if (!data?.key) {
            result.status = false
            result.errors.push("Từ khóa không được rỗng")
        }
        if (!result.status) return result;

        // let customer = await BuffVnDataSource.getRepository(CustomerEntity).findOne({
        //     where: {
        //         username: username,
        //         password: password,
        //         status: "active"
        //     }
        // });

        // if (!customer) {
        //     result.status = false;
        //     result.errors.push("Ten dang nhap hoac mat khau khong dung");
        // }

        let Product = new ProductEntity({
            id: data.id,
            key: data.key,
            name: data.name,
            description: data.description,
            images: data.images,
            updatedAt: new Date(),
            status: data.status,
        })

        //  await BuffVnDataSource.getRepository(ProductEntity).update(Product);
        return result;
    }


}