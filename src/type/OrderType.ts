import { BasePagingType } from "./BasePagingType"
import { StatusOrderType } from "./CommonType"

export type OrderPagingType<T> = BasePagingType<T> 

export type CreateOrderType = {
    orderCode: string
    guestId: number
    totalPrice: number
    shippingAddress: string
    note?: string,
    shippingFee?: number,
    discountCode?: string,
    discountFee?: number,
    status: StatusOrderType
}
export type UpdateOrderType = {
    id: number
    guestId: string
    totalPrice: number
    shippingAddress: string
    note?: string,
    shippingFee?: number,
    discountCode?: string,
    discountFee?: number,
    status: StatusOrderType,
    orderCode: string
}

