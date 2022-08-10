import { BuffVnDataSource } from "../dataSource";
import BlogCategoryEntity from "../entity/BlogCategoryEntity";
import { BlogCategoryPagingType, CreateBlogCategoryType, UpdateBlogCategoryType } from "../type/BlogCategoryType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";
import { IBaseFilterRequestType } from "../type/IBaseFilterRequestType";

export default class BlogCategoryService {
    private alias: string = "category"
    private async GetById(id: number) {
        let result = await BuffVnDataSource.getRepository(BlogCategoryEntity).findOneBy({
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

    public async GetAll(query?: any) {
        let queryData = BuffVnDataSource.createQueryBuilder(BlogCategoryEntity, this.alias)
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

    public async GetPaging(query: IBaseFilterRequestType) {
        let pageData: BlogCategoryPagingType<any> = {} as any;
        pageData.currentPage = query?.page ?? 1;
        pageData.pageSize = query?.pageSize ?? 10;
        let recordsToSkip = (query.page - 1) * pageData.pageSize;
        let queryData = BuffVnDataSource.createQueryBuilder(BlogCategoryEntity, this.alias)
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
    public async Create(data: CreateBlogCategoryType): Promise<BaseResponseServiceType> {
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
        let category = new BlogCategoryEntity({
            key: data.key,
            name: data.name,
            description: data.description,
            sort: data.sort,
            updatedAt: new Date(),
            createdAt: new Date(),
            status: data.status,
        })

        await BuffVnDataSource.getRepository(BlogCategoryEntity).save(category);
        return result;
    }

    public async Update(data: UpdateBlogCategoryType): Promise<BaseResponseServiceType> {
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

        await BuffVnDataSource.getRepository(BlogCategoryEntity).update({ id }, data);
        return result;
    }

    public async Delete(id: number): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!id) {
            result.status = false
            result.errors.push("Mã không được rỗng")
        }
        if (!result.status) return result;

        let category = await BuffVnDataSource.getRepository(BlogCategoryEntity).findOne({
            where: { id: id }
        });

        if (!category) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(BlogCategoryEntity).delete({ id });
        return result;
    }


}