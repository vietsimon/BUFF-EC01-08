import { BasePagingType } from "./BasePagingType"
import { StatusType } from "./CommonType"

export type OrderProductPagingType<T> = BasePagingType<T> 

export type CreateOrderProductType = {
    orderId: string
    quantity: number
    productId: string
    sizeId?: number
    currentPrice: number
}
export type UpdateOrderProductType = {
    id: number
    orderId: string
    quantity: number
    productId: string
    sizeId?: number
    currentPrice: number
}