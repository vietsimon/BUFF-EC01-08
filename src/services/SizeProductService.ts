import { BuffVnDataSource } from "../dataSource";
import SizeProductEntity from "../entity/SizeProductEntity";
import { SizeProductPagingType, CreateSizeProductType, UpdateSizeProductType } from "../type/SizeProductType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";
import { IBaseFilterRequestType } from "../type/IBaseFilterRequestType";

export default class SizeProductService {
    private alias: string = "size"

    private async GetById(id: number) {
        let result = await BuffVnDataSource.getRepository(SizeProductEntity).findOneBy({
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

        let size = await this.GetById(id);

        if (!size) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        result.data = size;
        return result;
    }

    public async GetAll() {
        let data = await BuffVnDataSource.createQueryBuilder(SizeProductEntity, this.alias)
            .select(`id`)
            .addSelect(`name`)
            .addSelect(`type`)
            .getRawMany();

        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data
        }
        return result;
    }

    public async GetPaging(query: IBaseFilterRequestType) {
        let pageData: SizeProductPagingType<any> = {} as any;
        pageData.currentPage = query?.page ?? 1;
        let recordsToSkip = (query.page - 1) * query.pageSize;
        let queryData = BuffVnDataSource.createQueryBuilder(SizeProductEntity, this.alias)
        if (query.keySearch)
            queryData = queryData.where(`${this.alias}.name like :name`, { name: `%${query.keySearch}%` });

        pageData.total = await queryData.getCount();
        pageData.datas = await queryData.skip(recordsToSkip)
            .take(query.pageSize).select(`${this.alias}.*`)
            .getRawMany();

        let result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data: pageData
        };
        return result;
    }
    public async Create(data: CreateSizeProductType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!data?.name) {
            result.status = false
            result.errors.push("Tên không được rỗng")
        }
        if (!data?.type) {
            result.status = false
            result.errors.push("Loại không được rỗng")
        }
        if (!result.status) return result;

        let size = new SizeProductEntity({
            name: data.name,
            type: data.type,
            updatedAt: new Date(),
            createdAt: new Date(),
            status: data.status,
        })

        await BuffVnDataSource.getRepository(SizeProductEntity).save(size);
        return result;
    }

    public async Update(data: UpdateSizeProductType): Promise<BaseResponseServiceType> {
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
        if (!data?.type) {
            result.status = false
            result.errors.push("Loại không được rỗng")
        }
        if (!result.status) return result;

        let size = await this.GetById(id);
        if (!size) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(SizeProductEntity).update({ id }, data);
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

        let size = await this.GetById(id);

        if (!size) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(SizeProductEntity).delete({ id });
        return result;
    }

}