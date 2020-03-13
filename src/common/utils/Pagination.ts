import { QueryData } from '@auraxy/services'

declare global {
    interface PageParams extends QueryData {
        pageIndex: string | number
        pageSize: string | number
    }

    interface PageResult<T = any> {
        pageSize: number
        pageIndex: number
        count: number
        pois: T[]
    }
}

export function cPageParams<T extends Partial<PageParams>>(
    params: T,
    defaultPageSize = 10,
) {
    return {
        ...params,
        pageIndex: params.pageIndex || 1,
        pageSize: params.pageSize || defaultPageSize,
    }
}
