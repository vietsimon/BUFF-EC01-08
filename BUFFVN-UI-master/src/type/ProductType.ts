export type ProductType = {
    key: string
    name: string
    categoryId: number
    price: number
    images?: Array<string>
}

export type ProductDetailType = ProductType & {
    id: number
    description: string
    detail?: string
    oldPrice: number
    technology: string
    material: string
    activity: string
    label: string,
    sizeId: number,
    colorId: number
}
