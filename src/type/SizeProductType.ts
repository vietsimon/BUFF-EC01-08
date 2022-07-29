import { BasePagingType } from "./BasePagingType"
import { StatusType } from "./CommonType"

export type SizeProductPagingType<T> = BasePagingType<T>

export type CreateSizeProductType = {
    type: string
    name: string
    status: StatusType
}
export type UpdateSizeProductType = {
    id: number
    type: string
    name: string
    status: StatusType
}