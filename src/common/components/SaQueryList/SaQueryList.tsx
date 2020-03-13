import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
import classNames from 'classnames'
import ReactLoading from '@auraxy/react-loading'
import { useMounted } from '@utils/CustomHooks'
import SaPagination, {
    SaPaginationProps,
} from '@components/SaPagination/SaPagination'
import Toast from '@components/Toast/Toast'
import './SaQueryList.scss'

export interface SaQueryRef {
    query(reset?: boolean): any
}

interface SaQueryListProps {
    paginationProps?: SaPaginationProps
    className?: string
    children?: React.ReactNode
    queryAtMounted?: boolean

    onQuery(pageInfo: Required<PageParams>): Promise<any>
}

const inputConfig = {
    enable: true,
    text: '前往',
}

function initPageParams(paginationProps: SaPaginationProps = {}) {
    return {
        pageIndex: 1,
        pageSize: 10,
        inputConfig,
        ...paginationProps,
    }
}

const SaQueryList = forwardRef<SaQueryRef, SaQueryListProps>(
    (
        {
            children,
            className,
            paginationProps,
            onQuery,
            queryAtMounted = true,
        },
        ref,
    ) => {
        useImperativeHandle(ref, () => ({
            query: (reset: boolean) => {
                query(reset ? 1 : undefined)
            },
        }))

        const $paginationProps = useRef(initPageParams(paginationProps))

        const [loading, setLoading] = useState(false)

        const query = useCallback(
            (pageIndex: number = $paginationProps.current.pageIndex) => {
                $paginationProps.current.pageIndex = pageIndex

                if (onQuery) {
                    setLoading(true)
                    onQuery({
                        pageIndex,
                        pageSize: $paginationProps.current.pageSize!,
                    })
                        .then((res: PageResult<any>) => {
                            $paginationProps.current.pageCount = Math.ceil(
                                res.count! / res.pageSize!,
                            )
                            setLoading(false)
                        })
                        .catch(Toast.error)
                }
            },
            [onQuery],
        )

        useMounted(() => {
            if (queryAtMounted) query()
        })

        const onPageChange = useCallback(
            (pageNumber: number) => {
                query(pageNumber)
                if ($paginationProps.current.onPageChange)
                    $paginationProps.current.onPageChange(pageNumber)
            },
            [query],
        )

        return (
            <>
                {loading ? (
                    <div className="loading-wrapper">
                        <ReactLoading />
                    </div>
                ) : (
                    <>
                        <div
                            className={classNames(
                                'sa-query-table-content',
                                className,
                            )}
                        >
                            {children}
                        </div>
                        <div className="sa-query-page-content">
                            <SaPagination
                                {...$paginationProps.current}
                                onPageChange={onPageChange}
                            />
                        </div>
                    </>
                )}
            </>
        )
    },
)

export default SaQueryList
