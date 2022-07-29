import { BasePagingType } from "./BasePagingType"
import { StatusType } from "./CommonType"

export type ColorPagingType<T> = BasePagingType<T>

export type CreateColorType = {
    name: string
    color: string
    status: StatusType
}
export type UpdateColorType = {
    id: number
    name: string
    color: string
    status: StatusType
}