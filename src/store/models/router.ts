import { RouteComponentProps } from 'react-router'

export interface RouterState extends RouteComponentProps {
    currentRoute: any
}

export const ROUTER = {
    UPDATE_ROUTER_INFO: 'UPDATE_ROUTER_INFO',
}

export default {
    namespace: 'router',
    state: {
        history: null,
        location: null,
        match: null,
        staticContext: undefined,
        currentRoute: null,
    },
    reducers: {
        [ROUTER.UPDATE_ROUTER_INFO](state: any, payload: RouterState) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
