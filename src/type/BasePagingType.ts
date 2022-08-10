export type BasePagingType<T> = {
    total: number
    currentPage: number
    pageSize: number
    //totalPage: number
    datas: Array<T>
}





