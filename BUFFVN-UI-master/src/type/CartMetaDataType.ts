import { ProductDetailType } from "./ProductType"

export type CartMetaDataType = {
    updatedAt?: Date,

    shippingMethod: string,//GHN , GHTK...
    shippingAddress: string,
    shippingProvinceId: string,
    shippingDistrictId: string,
    shippingWardId: string,
    shippingFee: number

    paymentMethod?: string,//vnpay , paypal , cashOnDelivery...
    note:string
}

export type CartItemType = ProductDetailType & {
    quantity: number
}
