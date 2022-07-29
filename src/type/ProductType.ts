import { StatusType } from "./CommonType"
export type CreateProductType = {
    key: string
    name: string
    description?: string
    images?: Array<string>,
    sort?: number
}
export type UpdateProductType = {
    id: number
    key: string
    name: string
    description?: string
    images?: Array<string>,
    status:StatusType
}