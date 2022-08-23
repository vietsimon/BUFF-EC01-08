
import { BasePagingType } from "./BasePagingType"
import { StatusType } from "./CommonType"
export type BaseCustomerType = {
    username: string
    fullName: string
    address: string
    email: string
    phone: string
}

export type RegisterCustomerType = BaseCustomerType &  {
    password: string
    dateOfBirth?: Date
}

export type CustomerPagingType<T> = BasePagingType<T> 

export type CreateCustomerType = RegisterCustomerType &  {
    status: StatusType
}

export type UpdateCustomerType = CreateCustomerType &  {
    id: number
}

