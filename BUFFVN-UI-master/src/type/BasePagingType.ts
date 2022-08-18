export type BasePagingType<T> = {
    //total item
    total: number
    currentPage: number
    pageSize: number
    // totalPage?: number
    datas?: Array<T>
}


