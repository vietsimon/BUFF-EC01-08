import { BasePagingType } from "./BasePagingType"
import { StatusType } from "./CommonType"

export type BlogCategoryPagingType<T> = BasePagingType<T> 

export type CreateBlogCategoryType = {
    key: string
    name: string
    description?: string
    sort?: number,
    status: StatusType
}
export type UpdateBlogCategoryType = {
    id: number
    key: string
    name: string
    description?: string
    sort?: number,
    status: StatusType
}