import { BuffVnDataSource } from "../dataSource";
import ProductEntity from "../entity/ProductEntity";
import { ProductPagingType, CreateProductType, UpdateProductType } from "../type/ProductType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";
import { IBaseFilterRequestType } from "../type/IBaseFilterRequestType";

export default class ProductService {
    private alias: string = "product"

    private async GetById(id: number) {
        let result = await BuffVnDataSource.createQueryBuilder(ProductEntity, this.alias)
            .where(`${this.alias}.id = :id`, { id: id })
            .leftJoin(`${this.alias}.category`, 'category')
            .leftJoin(`${this.alias}.size`, 'size')
            .leftJoin(`${this.alias}.color`, 'color')
            .select(`${this.alias}.*`)
            .addSelect([`category.id`, `category.name`])
            .addSelect([`size.id`, `size.name`])
            .addSelect([`color.id`, `color.name`])
            .getRawOne()
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

    public async GetPaging(query: IBaseFilterRequestType) {
        let pageData: ProductPagingType<any> = {} as any;
        pageData.currentPage = query?.page ?? 1;
        let recordsToSkip = (query.page - 1) * query.pageSize;
        let queryData = BuffVnDataSource.createQueryBuilder(ProductEntity, this.alias)
        if (query.keySearch)
            queryData = queryData.where(`${this.alias}.name like :name`, { name: `%${query.keySearch}%` });

        if (query.status)
            queryData = queryData.where(`${this.alias}.status like :status`, { status: `%${query.status}%` });

        pageData.total = await queryData.getCount();
        pageData.datas = await queryData.skip(recordsToSkip)
            .take(query.pageSize)
            .leftJoin(`${this.alias}.category`, 'category')
            .leftJoin(`${this.alias}.size`, 'size')
            .leftJoin(`${this.alias}.color`, 'color')
            .select(`${this.alias}.*`)
            .addSelect([`category.id`, `category.name`])
            .addSelect([`size.id`, `size.name`])
            .addSelect([`color.id`, `color.name`])
            .getRawMany();

        let result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data: pageData
        };
        return result;
    }

    public async Create(data: CreateProductType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!data?.key) {
            result.status = false
            result.errors.push("Từ khóa không được rỗng")
        }
        if (!data?.name) {
            result.status = false
            result.errors.push("Tên không được rỗng")
        }
        if (!data?.activity) {
            result.status = false
            result.errors.push("Hoạt động không được rỗng")
        }
        if (!data?.categoryId) {
            result.status = false
            result.errors.push("Danh mục không được rỗng")
        }
        if (!data?.description) {
            result.status = false
            result.errors.push("Mô tả không được rỗng")
        }
        if (!data?.gender) {
            result.status = false
            result.errors.push("Giới tính không được rỗng")
        }
        if (!data?.images) {
            result.status = false
            result.errors.push("Hình ảnh không được rỗng")
        }
        if (!data?.label) {
            result.status = false
            result.errors.push("Nhãn hiệu không được rỗng")
        }
        if (!data?.oldPrice) {
            result.status = false
            result.errors.push("Giá cũ không được rỗng")
        }
        if (!data?.price) {
            result.status = false
            result.errors.push("Giá không được rỗng")
        }
        if (!data?.sizeId) {
            result.status = false
            result.errors.push("Kích thước không được rỗng")
        }
        if (!data?.colorId) {
            result.status = false
            result.errors.push("Màu không được rỗng")
        }
        if (!data?.technology) {
            result.status = false
            result.errors.push("Công nghệ không được rỗng")
        }
        if (!data?.material) {
            result.status = false
            result.errors.push("Chất liệu không được rỗng")
        }
        if (!data?.status) {
            result.status = false
            result.errors.push("Trạng thái không được rỗng")
        }

        if (!result.status) return result;

        let size = new ProductEntity({
            updatedAt: new Date(),
            createdAt: new Date()
        })
        size = { ...size, ...data };
        await BuffVnDataSource.getRepository(ProductEntity).save(size);
        return result;
    }

    public async Update(data: UpdateProductType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        let id = data?.id;
        if (!id) {
            result.status = false
            result.errors.push("Mã không được rỗng")
        }

        if (!data?.key) {
            result.status = false
            result.errors.push("Từ khóa không được rỗng")
        }
        if (!data?.name) {
            result.status = false
            result.errors.push("Tên không được rỗng")
        }
        if (!data?.activity) {
            result.status = false
            result.errors.push("Hoạt động không được rỗng")
        }
        if (!data?.categoryId) {
            result.status = false
            result.errors.push("Danh mục không được rỗng")
        }
        if (!data?.description) {
            result.status = false
            result.errors.push("Mô tả không được rỗng")
        }
        if (!data?.gender) {
            result.status = false
            result.errors.push("Giới tính không được rỗng")
        }
        if (!data?.images) {
            result.status = false
            result.errors.push("Hình ảnh không được rỗng")
        }
        if (!data?.label) {
            result.status = false
            result.errors.push("Nhãn hiệu không được rỗng")
        }
        if (!data?.oldPrice) {
            result.status = false
            result.errors.push("Giá cũ không được rỗng")
        }
        if (!data?.price) {
            result.status = false
            result.errors.push("Giá không được rỗng")
        }
        if (!data?.sizeId) {
            result.status = false
            result.errors.push("Kích thước không được rỗng")
        }
        if (!data?.colorId) {
            result.status = false
            result.errors.push("Màu không được rỗng")
        }
        if (!data?.technology) {
            result.status = false
            result.errors.push("Công nghệ không được rỗng")
        }
        if (!data?.material) {
            result.status = false
            result.errors.push("Chất liệu không được rỗng")
        }
        if (!data?.status) {
            result.status = false
            result.errors.push("Trạng thái không được rỗng")
        }

        if (!result.status) return result;

        let product = await this.GetById(id);
        if (!product) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(ProductEntity).update({ id }, data);
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

        await BuffVnDataSource.getRepository(ProductEntity).delete({ id });
        return result;
    }
}