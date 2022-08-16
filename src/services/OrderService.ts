import { BuffVnDataSource } from "../dataSource";
import OrderEntity from "../entity/OrderEntity";
import { OrderPagingType, CreateOrderType, UpdateOrderType } from "../type/OrderType";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";
import { IBaseFilterRequestType } from "../type/IBaseFilterRequestType";

export default class OrderService {
    private alias: string = "order"
    private async GetById(id: number) {
        let result = await BuffVnDataSource.getRepository(OrderEntity).findOneBy({
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

        let Order = await this.GetById(id);

        if (!Order) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        result.data = Order;
        return result;
    }

    public async GetOrderPaging(query: IBaseFilterRequestType) {
        let pageData: OrderPagingType<any> = {} as any;
        pageData.currentPage = query?.page ?? 1;
        pageData.pageSize = query?.pageSize ?? 10;
        let recordsToSkip = (query.page - 1) * pageData.pageSize;
        let queryData = BuffVnDataSource.createQueryBuilder(OrderEntity, this.alias)
        if (query.keySearch)
            queryData = queryData.where(`${this.alias}.orderCode like :orderCode`, { orderCode: `%${query.keySearch}%` });

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
    public async CreateOrder(data: CreateOrderType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!data?.orderCode) {
            result.status = false
            result.errors.push("Mã hóa đơn không được rỗng")
        }
        if (!data?.guestId) {
            result.status = false
            result.errors.push("Khách hàng không được rỗng")
        }
        if (data?.totalPrice<=0) {
            result.status = false
            result.errors.push("Giá không hợp lệ")
        }
        if (!data?.shippingAddress) {
            result.status = false
            result.errors.push("Địa chỉ không được rỗng")
        }
        if (!data?.note) {
            result.status = false
            result.errors.push("Ghi chú không được rỗng")
        }
       
        // if (data?.shippingFee<=0) {
        //     result.status = false
        //     result.errors.push("Giá Shipping không hợp lệ")
        // }

        // if (!data?.discountCode) {
        //     result.status = false
        //     result.errors.push("Mã khuyến mãi không được rỗng")
        // }
        // if (data?.discountFee<=0) {
        //     result.status = false
        //     result.errors.push("Giá khuyến mãi không hợp lệ")
        // }

        if (!result.status) return result;

        // data.key=Common.replaceAccents( data.name);
        let order = new OrderEntity({
            orderCode: data.orderCode,
            guestId: data.guestId,
            totalPrice: data.totalPrice,
            shippingAddress: data.shippingAddress,
            note: data.note,
            shippingFee: data.shippingFee,
            discountCode: data.discountCode,
            discountFee: data.discountFee,
            updatedAt: new Date(),

            createdAt: new Date(),
            status: data.status,
        })

        await BuffVnDataSource.getRepository(OrderEntity).save(order);
        return result;
    }

    public async UpdateOrder(data: UpdateOrderType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        let id = data?.id;
        if (!id) {
            result.status = false
            result.errors.push("Mã không được rỗng")
        }

        if (!data?.orderCode) {
            result.status = false
            result.errors.push("Mã hóa đơn không được rỗng")
        }
        if (!data?.guestId) {
            result.status = false
            result.errors.push("Khách hàng không được rỗng")
        }
        if (data?.totalPrice<=0) {
            result.status = false
            result.errors.push("Giá không hợp lệ")
        }
        if (!data?.shippingAddress) {
            result.status = false
            result.errors.push("Địa chỉ không được rỗng")
        }
        if (!data?.note) {
            result.status = false
            result.errors.push("Ghi chú không được rỗng")
        }
       
        // if (data?.shippingFee<=0) {
        //     result.status = false
        //     result.errors.push("Giá Shipping không hợp lệ")
        // }

        // if (!data?.discountCode) {
        //     result.status = false
        //     result.errors.push("Mã khuyến mãi không được rỗng")
        // }
        // if (data?.discountFee<=0) {
        //     result.status = false
        //     result.errors.push("Giá khuyến mãi không hợp lệ")
        // }

        if (!result.status) return result;

        let order = await this.GetById(id);
        if (!order) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(OrderEntity).update({ id }, data);
        return result;
    }

    public async DeleteOrder(id: number): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!id) {
            result.status = false
            result.errors.push("Mã không được rỗng")
        }
        if (!result.status) return result;

        let order = await BuffVnDataSource.getRepository(OrderEntity).findOne({
            where: { id: id }
        });

        if (!order) {
            result.status = false;
            result.errors.push("Không tồn tại thông tin này!");
        }
        if (!result.status) return result;

        await BuffVnDataSource.getRepository(OrderEntity).delete({ id });
        return result;
    }


}