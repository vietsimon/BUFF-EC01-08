import { BuffVnDataSource } from "../dataSource";
import CategoryEntity from "../entity/CategoryEntity";
import { CategoryPagingType, CreateCategoryType, UpdateCategoryType } from "../type/CategoryType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";
import { IBaseFilterRequestType } from "../type/IBaseFilterRequestType";

export default class CategoryService {
    private alias: string = "category"
    private async GetById(id: number) {
        let result = await BuffVnDataSource.getRepository(CategoryEntity).findOneBy({
            id
        });
        return result;
    }

    public async GetDetail(id: number) {
        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data: {}
        }
        if (!id) {
            result.status = false
            result.errors.push("Mã không được rỗng")
        }
        if (!result.status) return result;

        let category = await this.GetById(id);

        if (!category) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        result.data = category;
        return result;
    }

    public async GetAllCategory(query?: any) {
        let queryData = BuffVnDataSource.createQueryBuilder(CategoryEntity, this.alias)
        if (query?.status)
            queryData = queryData.where(`${this.alias}.status = :status`, { status: `${query.status}` });
        let data = await queryData.select(`${this.alias}.*`)
            .getRawMany();
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
            .select(`${this.alias}.*`)
            .getRawMany();

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
            status: data.status,
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

        let category = await this.GetById(id);
        if (!category) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(CategoryEntity).update({ id }, data);
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