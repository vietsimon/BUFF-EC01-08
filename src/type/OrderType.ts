import { BasePagingType } from "./BasePagingType"
import { StatusOrderType } from "./CommonType"

export type OrderPagingType<T> = BasePagingType<T> 

export type OrderType = {
    orderCode: string
    guestId: number
    totalPrice: number
    shippingAddress: string
}

export type CreateOrderType =OrderType& {
    note?: string,
    shippingFee?: number,
    discountCode?: string,
    discountFee?: number,

    shippingMethod: string,//GHN , GHTK...
    shippingProvinceId: string,
    shippingDistrictId: string,
    shippingWardId: string,
    paymentMethod?: string,//vnpay , paypal , cashOnDelivery...
    items:Array<any>
    status: StatusOrderType
}
export type UpdateOrderType  =OrderType& {
    id:number,
    note?: string,
    shippingFee?: number,
    discountCode?: string,
    discountFee?: number,

    shippingMethod: string,//GHN , GHTK...
    shippingProvinceId: string,
    shippingDistrictId: string,
    shippingWardId: string,
    paymentMethod?: string,//vnpay , paypal , cashOnDelivery...

    items:Array<any>
    status: StatusOrderType
}

export type OrderPaymentStatusType  = {
    orderId:number
}
