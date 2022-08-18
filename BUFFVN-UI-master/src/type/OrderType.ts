
export type OrderType = {
    shippingAddress: string,
    totalPrice: number,
    status?: string
}

export type OrderCreateType = OrderType & {
    note: string,
    shippingFee: number,
    discountCode?: string
    discountFee?: number,

    shippingMethod: string,//GHN , GHTK...
    shippingProvinceId: string,
    shippingDistrictId: string,
    shippingWardId: string,
    paymentMethod?: string,//vnpay , paypal , cashOnDelivery...

    items: Array<OrderItemType>
}
export type OrderUpdateType = OrderCreateType & {
    id: string,
    orderCode: string,
}
//item
export type OrderItemType = {
    quantity: number,
    productId: number,
    currentPrice: number
}

export type OrderItemCreateType = OrderItemType & {
    sizeId: number
}
