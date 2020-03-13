import { CRouteProps } from '@/store/custom-connect'
import { ROUTER } from '@/store/models/router'
import Loading from '@components/Loading/Loading'
import Loadable from '@loadable/component'
import {
    createBrowserHistory,
    LocationDescriptorObject,
    LocationState,
} from 'history'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Store } from 'redux'
import { GlobalConfig, Guard, RouterGuard } from 'router-guard'

/* eslint-disable */
const Resource = Loadable(() => import('@/views/Resource/Resource' /* webpackChunkName: "UserPage" */))
const ResourceDashboard = Loadable(() => import('@/views/Resource/Dashboard/Dashboard' /* webpackChunkName: "Dashboard" */))
const Excel = Loadable(()=> import('@/views/Resource/Excel/Excel' /* webpackChunkName: "Excel" */))

const GaoDe = Loadable(() => import('@/views/GaoDe/GaoDe' /* webpackChunkName: "GaoDe"*/))
const GaoDeKeywordSearch = Loadable(() => import('@/views/GaoDe/KeywordSearch/KeywordSearch' /* wepackChunkName: "keywordSearch" */))

const SkillTree = Loadable(() => import('@/views/SkillTree/SkillTree' /* webpackChunkName: "keywordSearch" */))
const SkillTreeDashboard  = Loadable(()=> import('@/views/SkillTree/Dashboard/Dashboard' /* webpackChunkName: "SkillTreeDashboard" */))
const WebSocket = Loadable(()=> import('@/views/SkillTree/WebSocket/WebSocket' /* webpackChunkName: "WebSocket" */))

const We = Loadable(() => import('@/views/We/We' /* webpackChunkName: "We" */))
const WeDashboard = Loadable(() => import('@/views/We/Dashboard/Dashboard' /* webpackChunkName: "WeDashboard" */))

const NotFound = Loadable(() => import('@/views/NotFound/NotFound' /* webpackChunkName: "NotFound" */))


const GaodePagesSubRoutes = {
  /** 高德地图 */
  GaoDe: { path: '/gaode', exact: true, redirect: '/gaode/keyword-search'},
  /** 关键词搜索 */
  KeywordSearch: { path: '/gaode/keyword-search', component: GaoDeKeywordSearch }
} 

const ResourcePageSubRoutes = {
  /** 个人中心 */
  ResourceIndex: { path: '/resource', exact: true, redirect: '/resource/dashboard' },
  /** 首页 */
  Dashboard: { path: '/resource/dashboard', component: ResourceDashboard },
  /** 读取表格内容 */
  Excel: { path: '/resource/excel', component: Excel }
}

const SkillTreeSubRouter = {
  /** web技能树 */
  SkillTree: { path: '/skill-tree', exact: true, redirect: '/skill-tree/dashboard'},
  Dashboard: { path: '/skill-tree/dashboard', component: SkillTreeDashboard},
  WebSocket: { path: '/skill-tree/web-socket', component: WebSocket}
}

const WeSubRouter = {
  /** we */
  We: { path : '/we', exact: true, redirect: '/we/dashboard' },
  Dashboard: { path: '/we/dashboard', component: WeDashboard}
}


const Routes = {
  Resource: { path: '/resource', component: Resource },
  GaoDe: { path: '/gaode', component: GaoDe },
  SkillTree: { path: '/skill-tree', component: SkillTree},
  We: { path: '/we', component: We}
}
/* eslint-enable */

type LocationType = LocationDescriptorObject<LocationState>

type AppUrlsType = {
    [key in keyof typeof Routes | keyof typeof ResourcePageSubRoutes]: (
        options?: LocationType,
    ) => LocationType
}

export const AppUrls: AppUrlsType = [
    ...Object.entries(Routes),
    ...Object.entries(ResourcePageSubRoutes),
].reduce((pre: any, [key, route]: [string, CRouteProps]) => {
    const pathname = typeof route.path === 'string' ? route.path : route.path[0]
    pre[key] = (options?: LocationType) => ({ pathname, ...options })
    return pre
}, {})

export default Routes

GlobalConfig.pendingPlaceholder = () => <Loading />

export function generate(routes: CRouteProps[], guard?: Guard | null) {
    return (
        <Switch>
            {routes.map((route, i: number) => {
                const { meta, redirect, component: Component, ...rest } = route
                return redirect ? (
                    <Route
                        {...rest}
                        render={() => <Redirect to={redirect} />}
                        key={i}
                    />
                ) : (
                    <Route
                        {...rest}
                        component={RouterGuard(Component, meta, guard)}
                        key={i}
                    />
                )
            })}
            <Route path="*" component={RouterGuard(NotFound, null, guard)} />
        </Switch>
    )
}

export function generateRoutes(store: Store) {
    const guard: Guard = (to, next) => {
        if (to.location.pathname === '/') {
            next({ path: '/resource', replace: true })
        }

        const routeBranches = () => {
            next()
            store.dispatch({ type: ROUTER.UPDATE_ROUTER_INFO, payload: to })
        }

        routeBranches()
    }

    return generate(Object.values(Routes), guard)
}

export function generateTestCompRoute(component: any) {
    return generate([{ path: '/', component }])
}

export function generateUserPageRoutes() {
    return generate(Object.values(ResourcePageSubRoutes), null)
}

export function generateGaodePageRoutes() {
    return generate(Object.values(GaodePagesSubRoutes), null)
}

export function generateSkillTreePageRoutes() {
    return generate(Object.values(SkillTreeSubRouter), null)
}

export function generateWePageRoutes() {
    return generate(Object.values(WeSubRouter), null)
}

export const browserHistory = createBrowserHistory()
