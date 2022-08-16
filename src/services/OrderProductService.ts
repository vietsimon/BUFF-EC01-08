import { BuffVnDataSource } from "../dataSource";
import OrderProductEntity from "../entity/OrderProductEntity";
import { OrderProductPagingType, CreateOrderProductType, UpdateOrderProductType } from "../type/OrderProductType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";
import { IBaseFilterRequestType } from "../type/IBaseFilterRequestType";

export default class OrderProductService {
    private alias: string = "orderproduct"
    private async GetById(id: number) {
        let result = await BuffVnDataSource.getRepository(OrderProductEntity).findOneBy({
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

        let orderProduct = await this.GetById(id);

        if (!orderProduct) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        result.data = orderProduct;
        return result;
    }

    public async GetOrderProductPaging(query: IBaseFilterRequestType) {
        let pageData: OrderProductPagingType<any> = {} as any;
        pageData.currentPage = query?.page ?? 1;
        pageData.pageSize = query?.pageSize ?? 10;
        let recordsToSkip = (query.page - 1) * pageData.pageSize;
        let queryData = BuffVnDataSource.createQueryBuilder(OrderProductEntity, this.alias)
        // if (query.keySearch)
        //     queryData = queryData.where(`${this.alias}.orderId like :orderId`, { orderId: `%${query.keySearch}%` });

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
    public async CreateOrderProduct(data: CreateOrderProductType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }

        if (!data?.orderId) {
            result.status = false
            result.errors.push("Mã hóa đơn không được rỗng")
        }
        if (!data?.productId) {
            result.status = false
            result.errors.push("Mã sản phẩm không được rỗng")
        }
        if (data?.quantity<=0) {
            result.status = false
            result.errors.push("Số lượng không hợp lệ")
        }
        // if (!data?.sizeId) {
        //     result.status = false
        //     result.errors.push("Kích thước không được rỗng")
        // }

      if (data?.currentPrice<=0) {
            result.status = false
            result.errors.push("Giá không hợp lệ")
        }
      
        if (!result.status) return result;

        let orderProduct = new OrderProductEntity({
            orderId: data.orderId,
            productId: data.productId,
            quantity: data.quantity,
            sizeId: data.sizeId,
            currentPrice: data.currentPrice,
            updatedAt: new Date(),
            createdAt: new Date(),
            status: data.status,
        })

        await BuffVnDataSource.getRepository(OrderProductEntity).save(orderProduct);
        return result;
    }

    public async UpdateOrderProduct(data: UpdateOrderProductType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        let id = data?.id;
        if (!id) {
            result.status = false
            result.errors.push("Mã không được rỗng")
        }

        if (!data?.orderId) {
            result.status = false
            result.errors.push("Mã hóa đơn không được rỗng")
        }
        if (!data?.productId) {
            result.status = false
            result.errors.push("Mã sản phẩm không được rỗng")
        }
        if (data?.quantity<=0) {
            result.status = false
            result.errors.push("Số lượng không hợp lệ")
        }
        // if (!data?.sizeId) {
        //     result.status = false
        //     result.errors.push("Kích thước không được rỗng")
        // }

      if (data?.currentPrice<=0) {
            result.status = false
            result.errors.push("Giá không hợp lệ")
        }
       
        if (!result.status) return result;

        let orderProduct = await this.GetById(id);
        if (!orderProduct) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(OrderProductEntity).update({ id }, data);
        return result;
    }

    public async DeleteOrderProduct(id: number): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!id) {
            result.status = false
            result.errors.push("Mã không được rỗng")
        }
        if (!result.status) return result;

        let orderProduct = await BuffVnDataSource.getRepository(OrderProductEntity).findOne({
            where: { id: id }
        });

        if (!orderProduct) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(OrderProductEntity).delete({ id });
        return result;
    }


}