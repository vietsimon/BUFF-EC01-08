import { BuffVnDataSource } from "../dataSource";
import CategoryEntity from "../entity/CategoryEntity";
import { CategoryPagingType, CreateCategoryType, UpdateCategoryType } from "../type/CategoryType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";
import { IBaseFilterRequestType } from "../type/IBaseFilterRequestType";

export default class CategoryService {
    private alias: string = "category"
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
        let data = await BuffVnDataSource.createQueryBuilder(CategoryEntity, "cate")
            .select(`cate.id`)
            .addSelect(`cate.key`)
            .addSelect(`cate.name`)
            .addSelect(`cate.createdAt`)
            .addSelect(`cate.updatedAt`)
            .addSelect(`cate.status`)
            .execute();

        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data
        }
        return result;
    }

    public async GetCategoryPaging(query: IBaseFilterRequestType) {
        let pageData: CategoryPagingType<any> = {} as any;
        pageData.currentPage = query?.page ?? 1;
        const recordsToSkip = (query.page - 1) * query.pageSize;
        let queryData = BuffVnDataSource.createQueryBuilder(CategoryEntity, this.alias)
        if (query.keySearch) 
            queryData = queryData.where(`${this.alias}.name like :name`, { name: `%${query.keySearch}%` });
      
        pageData.total = await queryData.getCount();
        pageData.datas = await queryData.skip(recordsToSkip)
            .take(query.pageSize)
            .execute();

        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data: pageData
        };
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
        let id = data?.id;
        if (!id) {
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

        let category = await BuffVnDataSource.getRepository(CategoryEntity).findOne({
            where: { id: data?.id }
        });
        if (!category) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        var updateResult = await BuffVnDataSource.getRepository(CategoryEntity).update({ id }, data);
        console.log(updateResult);

        return result;
    }

    public async DeleteCategory(id: number): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!id) {
            result.status = false
            result.errors.push("Mã không được rỗng")
        }
        if (!result.status) return result;

        let category = await BuffVnDataSource.getRepository(CategoryEntity).findOne({
            where: { id: id }
        });

        if (!category) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(CategoryEntity).delete({ id });
        return result;
    }


}