export type BaseResponseServiceType = {
    status: boolean
    errors: Array<string>
}

export type DataResponseServiceType<T> = BaseResponseServiceType & {
    data: T
}

export type StatusType = "active" | "inactive"
export type GenderType = "all" | "man" | "women" | "kid"