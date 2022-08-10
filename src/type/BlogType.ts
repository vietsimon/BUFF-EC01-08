import { BasePagingType } from "./BasePagingType"
import { GenderType, StatusType } from "./CommonType"

export type BlogPagingType<T> = BasePagingType<T>

export type CreateBlogType = {
    key: string
    name: string
    categoryId: number
    description: string
    detail?: string
    images?: Array<string>
    status: StatusType
}
export type UpdateBlogType = {
    id: number
    key: string
    name: string
    categoryId: number
    description: string,
    detail?: string,
    images?: Array<string>
    status: StatusType
}