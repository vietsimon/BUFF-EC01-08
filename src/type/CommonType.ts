export type BaseResponseServiceType = {
    status: boolean
    errors: Array<string>
}

export type DataResponseServiceType<T> = BaseResponseServiceType & {
    data: T
}