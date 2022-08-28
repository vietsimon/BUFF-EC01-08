import { BasePagingType } from "./BasePagingType"
import { GenderType, StatusType } from "./CommonType"

export type ProductPagingType<T> = BasePagingType<T>

export type CreateProductType = {
    key: string
    name: string
    categoryId: number
    description: string
    detail?: string
    price: number
    oldPrice: number
    images?: Array<string>
    gender: GenderType
    technology: string
    material: string
    activity: string
    brandId?: number,
    sizeId: number,
    colorId: number,
    status: StatusType
}
export type UpdateProductType = {
    id: number
    key: string
    name: string
    categoryId: number
    description: string,
    detail?: string,
    price: number
    oldPrice: number
    images?: Array<string>
    gender: GenderType
    technology: string
    material: string
    activity: string
    brandId?: number,
    sizeId: number,
    colorId: number,
    status: StatusType
}