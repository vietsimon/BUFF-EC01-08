import { BuffVnDataSource } from "../dataSource";
import ColorEntity from "../entity/ColorEntity";
import { ColorPagingType, CreateColorType, UpdateColorType } from "../type/ColorType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";
import { IBaseFilterRequestType } from "../type/IBaseFilterRequestType";

export default class ColorService {
    private alias: string = "colorProduct"

    private async GetById(id: number) {
        let result = await BuffVnDataSource.getRepository(ColorEntity).findOneBy({
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
        let data = await BuffVnDataSource.createQueryBuilder(ColorEntity, this.alias)
            .select(`id`)
            .addSelect(`name`)
            .addSelect(`color`)
            .getRawMany();

        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data
        }
        return result;
    }

    public async GetPaging(query: IBaseFilterRequestType) {
        let pageData: ColorPagingType<any> = {} as any;
        pageData.currentPage = query?.page ?? 1;
        let recordsToSkip = (query.page - 1) * query.pageSize;
        let queryData = BuffVnDataSource.createQueryBuilder(ColorEntity, this.alias)
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

    public async Create(data: CreateColorType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!data?.name) {
            result.status = false
            result.errors.push("Tên không được rỗng")
        }
        if (!data?.color) {
            result.status = false
            result.errors.push("Màu không được rỗng")
        }
        if (!result.status) return result;

        let size = new ColorEntity({
            name: data.name,
            color: data.color,
            updatedAt: new Date(),
            createdAt: new Date(),
            status: data.status,
        })

        await BuffVnDataSource.getRepository(ColorEntity).save(size);
        return result;
    }

    public async Update(data: UpdateColorType): Promise<BaseResponseServiceType> {
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
        if (!data?.color) {
            result.status = false
            result.errors.push("Màu không được rỗng")
        }
        if (!result.status) return result;

        let size = await this.GetById(id);
        if (!size) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(ColorEntity).update({ id }, data);
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

        await BuffVnDataSource.getRepository(ColorEntity).delete({ id });
        return result;
    }
}