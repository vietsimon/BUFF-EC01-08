import { BasePagingType } from "./BasePagingType"
import { StatusType } from "./CommonType"

export type BrandPagingType<T> = BasePagingType<T> 

export type CreateBrandType = {
    key: string
    name: string
    description?: string
    picture?: string,
    sort?: number,
    status: StatusType
}
export type UpdateBrandType = {
    id: number
    key: string
    name: string
    description?: string
    picture?: string,
    sort?: number,
    status: StatusType
}