import { Http as HttpClass, QueryData } from '@auraxy/services'
import Toast from '@components/Toast/Toast'
import { promiseOnPending } from '@livelybone/singleton'
import { StorageUtils } from '@livelybone/storage'
import { Token } from '@utils/Storage'
import { backendUrl } from '@/config/config'
import { AxiosError } from 'axios'

const CodeType = {
    0: { defaultMsg: '' },
    1: { defaultMsg: '请求失败!' },
    403: { defaultMsg: '登录过期，请重新登陆！' },
}

interface ApiResult<T = any> {
    code: keyof typeof CodeType
    succ: boolean
    message?: string | null
    value?: T
}

interface APIError<CodeType, T = any> extends AxiosError<T> {
    resCode?: CodeType
}

type ApiError = APIError<keyof typeof CodeType>

function isError(data: ApiResult) {
    return data.code !== 0
}

function errorDeal(e: ApiError) {
    if (
        (e.response && e.response.status === 403) ||
        (e.resCode && e.resCode === 403)
    ) {
        e.message = CodeType[403].defaultMsg
        Toast.error(e)
    } else {
        if (e.response && e.response.data && e.response.data.message) {
            e.message = e.response.data.message
        } else if (e.message === 'Network Error')
            e.message = '网络出错了，请重试'
        else if (!e.message) e.message = CodeType[e.resCode || 1].defaultMsg
        throw e
    }
}

const Http = new HttpClass({
    baseURL: backendUrl,
    interceptors: {
        request: [
            conf => ({
                ...conf,
                headers: {
                    ...conf.headers,
                    Authorization: Token.get(),
                },
            }),
        ],
        response: [
            res => {
                const { data, config: conf, request, headers } = res

                if ((conf.url || '').includes('ditu.amap.com/')) return data

                if (request.responseType === 'blob') {
                    const match = headers['content-disposition'].match(
                        /filename=(.*)$/,
                    )
                    if (match && match[1]) {
                        ;(data as any).name = decodeURI(match[1])
                    }
                    return res
                }

                const { message, code, value: data1 } = data
                if (isError(data)) {
                    const error = new Error(message) as ApiError
                    error.resCode = code
                    error.config = conf
                    error.request = request
                    error.response = res
                    errorDeal(error)
                }
                return data1
            },
            errorDeal,
        ],
    },
    errorHandler: e => console.warn(e),
})

const defaultTime = 30000

export default Http

export const CacheHttp = {
    get<T = any>(
        url: string,
        qData?: QueryData,
        cacheTime: number = defaultTime,
    ) {
        return promiseOnPending(() => Http.get<T>(url, qData).toPromise(), {
            id: `${url}-${StorageUtils.stringifyJSON(qData)}`,
            delayTime: cacheTime,
        })
    },
}
