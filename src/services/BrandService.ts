import { BuffVnDataSource } from "../dataSource";
import BrandEntity from "../entity/BrandEntity";
import { BrandPagingType, CreateBrandType, UpdateBrandType } from "../type/BrandType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";
import { IBaseFilterRequestType } from "../type/IBaseFilterRequestType";

export default class BrandService {
    private alias: string = "brand"
    private async GetById(id: number) {
        let result = await BuffVnDataSource.getRepository(BrandEntity).findOneBy({
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

        let brand = await this.GetById(id);

        if (!brand) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        result.data = brand;
        return result;
    }

    public async GetAll(query?: any) {
        let queryData = BuffVnDataSource.createQueryBuilder(BrandEntity, this.alias)
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
        let pageData: BrandPagingType<any> = {} as any;
        pageData.currentPage = query?.page ?? 1;
        pageData.pageSize = query?.pageSize ?? 10;
        let recordsToSkip = (query.page - 1) * pageData.pageSize;
        let queryData = BuffVnDataSource.createQueryBuilder(BrandEntity, this.alias)
        if (query.keySearch)
            queryData = queryData.where(`${this.alias}.name like :name`, { name: `%${query.keySearch}%` });

        pageData.total = await queryData.getCount();
        pageData.datas = await queryData.offset(recordsToSkip)
            .limit(query.pageSize)
            .select(`${this.alias}.*`)
            .getRawMany();

        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data: pageData
        };
        return result;
    }
    public async Create(data: CreateBrandType): Promise<BaseResponseServiceType> {
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
        let brand = new BrandEntity({
            updatedAt: new Date(),
            createdAt: new Date()
        })
        brand={...brand,...data}
        await BuffVnDataSource.getRepository(BrandEntity).save(brand);
        return result;
    }

    public async Update(data: UpdateBrandType): Promise<BaseResponseServiceType> {
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

        let brand = await this.GetById(id);
        if (!brand) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(BrandEntity).update({ id }, data);
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

        let brand = await BuffVnDataSource.getRepository(BrandEntity).findOne({
            where: { id: id }
        });

        if (!brand) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(BrandEntity).delete({ id });
        return result;
    }


}