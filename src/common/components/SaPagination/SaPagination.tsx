import ReactPagination, { PaginationProps } from '@livelybone/react-pagination'
import React, { useLayoutEffect, useRef } from 'react'
import './SaPagination.scss'

export type SaPaginationProps = Partial<
    Pick<PaginationProps, Exclude<keyof PaginationProps, 'currentPageNumber'>>
> & {
    pageIndex?: number
}

const SaPagination: React.FC<SaPaginationProps> = ({
    children,
    pageIndex,
    inputConfig,
    pageSize = 10,
    pageCount,
    ...rest
}) => {
    const pagination = useRef<ReactPagination>(null)
    const $inputConfig =
        inputConfig || ({ enabled: false } as PaginationProps['inputConfig'])

    useLayoutEffect(() => {
        pagination.current!.setPageNumber(pageIndex || 1)
    }, [pageIndex])

    return (
        <div className="pagination-wrap">
            {!!pageCount && (
                <span className="total-page">共 {pageCount} 页</span>
            )}
            <ReactPagination
                {...rest}
                pageCount={pageCount}
                inputConfig={$inputConfig}
                pageSize={pageSize}
                ref={pagination}
            />
        </div>
    )
}

export default SaPagination
