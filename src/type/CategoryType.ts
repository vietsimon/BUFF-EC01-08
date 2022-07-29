import { BasePagingType } from "./BasePagingType"
import { StatusType } from "./CommonType"

export type CategoryPagingType<T> = BasePagingType<T> 

export type CreateCategoryType = {
    key: string
    name: string
    parentId: number
    description?: string
    picture?: string,
    sort?: number,
    status: StatusType
}
export type UpdateCategoryType = {
    id: number
    key: string
    name: string
    parentId: number
    description?: string
    picture?: string,
    sort?: number,
    status: StatusType
}