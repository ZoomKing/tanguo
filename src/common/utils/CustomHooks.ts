import { Dispatch, useEffect, useReducer, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'

type State = { [key in string | number]: any }

export function useMixedState<T = State, PT = Partial<T>>(
    initialState: T,
): [T, Dispatch<PT>] {
    return useReducer(
        (state: any, action: PT) => ({
            ...state,
            ...action,
        }),
        initialState,
    )
}

export function useBtnDisabled(inpVal: { [key: string]: string } | string) {
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (typeof inpVal === 'string') {
            setDisabled(inpVal === '')
        } else {
            setDisabled(Object.values(inpVal).some(item => item === ''))
        }
    }, [inpVal])

    return disabled
}

export function useMounted(action?: () => any) {
    const [isMounted, set] = useState(false)

    useEffect(() => {
        if (!isMounted) {
            if (action) action()
            set(true)
        }
    }, [action, isMounted])

    return isMounted
}

export function useRequireAuth() {
    const meta = useSelector((state: any) => state.router.meta)

    return !(meta && meta.requireAuth === false)
}

// 表单的起始和截止日期Hook
export function useGetRangeDate(form: any) {
    return useCallback(
        (date: [string, string]) => {
            form.itemChange('startDate', date[0])
            form.itemChange('endDate', date[1])
        },
        [form],
    )
}

export function useApi<T extends any, ApiRes extends any>(
    api: () => PromiseLike<ApiRes>,
    initialValue: T,
    dealFn?: (result: ApiRes) => T,
): [T, () => void] {
    const [result, setResult] = useState<T>(initialValue)

    return [
        result,
        () =>
            api()
                .then(res => (dealFn ? dealFn(res) : (res as any)))
                .then(setResult),
    ]
}
