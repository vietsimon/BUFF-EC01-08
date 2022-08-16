import { BasePagingType } from "./BasePagingType"
import { StatusType } from "./CommonType"

export type OrderProductPagingType<T> = BasePagingType<T> 

export type CreateOrderProductType = {
    orderId: number
    quantity: number
    productId: number
    sizeId?: number
    currentPrice: number
    status : string
}
export type UpdateOrderProductType = {
    id: number
    orderId: string
    quantity: number
    productId: string
    sizeId?: number
    currentPrice: number
}