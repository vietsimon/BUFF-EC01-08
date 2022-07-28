import { BuffVnDataSource } from "../dataSource";
import CategoryEntity from "../entity/CategoryEntity";
import { CreateCategoryType, UpdateCategoryType } from "../type/CategoryType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";

export default class CategoryService {
    public async GetCategoryById(id: number) {
        let result = await BuffVnDataSource.getRepository(CategoryEntity).findOneBy({
            id
        });
        return result;
    }

    public async GetCategoryByKey(key: string) {
        let result = await BuffVnDataSource.getRepository(CategoryEntity).findOneBy({
            key
        });
        return result;
    }

    public async GetAllCategory() {
        let data = await BuffVnDataSource.createQueryBuilder(CategoryEntity, "lv1")
            .leftJoin(CategoryEntity, 'lv2', `lv2."parentId" = lv1.id`)
            .leftJoin(CategoryEntity, 'lv3', `lv3."parentId" = lv2.id`)
            .leftJoin(CategoryEntity, 'lv4', `lv4."parentId" = lv3.id`)
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

    public async CreateCategory(data: CreateCategoryType): Promise<BaseResponseServiceType> {
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
        let category = new CategoryEntity({
            key: data.key,
            name: data.name,
            description: data.description,
            parentId: data.parentId,
            picture: data.picture,
            sort: data.sort,
            updatedAt: new Date(),
            createdAt: new Date(),
            status: "active",
        })

        await BuffVnDataSource.getRepository(CategoryEntity).save(category);
        return result;
    }

    public async UpdateCategory(data: UpdateCategoryType): Promise<BaseResponseServiceType> {
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

        let category = new CategoryEntity({
            id: data.id,
            key: data.key,
            name: data.name,
            description: data.description,
            parentId: data.parentId,
            picture: data.picture,
            sort: data.sort,
            updatedAt: new Date(),
            status: data.status,
        })

        //  await BuffVnDataSource.getRepository(CategoryEntity).update(category);
        return result;
    }


}