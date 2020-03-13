import router from '@/store/models/router'
import { createReduxStore } from '@auraxy/redux-usage'
import { isBrowser } from '@utils/UserAgent'

declare const window: any

export function createStore() {
    const initialState = isBrowser ? window.INITIAL_STATE : {}
    const models = [router]

    return createReduxStore(models, {
        initialState,
        sagaOptions: {
            onError(err, info) {
                console.warn(err, info)
            },
        },
    })
}

export const store = createStore()
