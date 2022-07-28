import { StatusType } from "./CommonType"

export type CreateCategoryType = {
    key: string
    name: string
    parentId: number
    description?: string
    picture?: string,
    sort?: number
}
export type UpdateCategoryType = {
    id: number
    key: string
    name: string
    parentId: number
    description?: string
    picture?: string,
    sort?: number,
    status:StatusType
}