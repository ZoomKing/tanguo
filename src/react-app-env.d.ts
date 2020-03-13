/// <reference types="react-scripts" />
/// <reference path="./views/GaoDe/GaoDe.d.ts" />
declare module 'classnames' {
    export default function classNames(...args: any[]): string
}

declare module 'core-js/es/object/entries'
declare module 'core-js/es/object/values'

declare module 'react-copy-to-clipboard'

declare module '@loadable/component' {
    export default function Loadable(importFn: () => any): any
}

declare interface Props {
    [key: string]: any
}

declare type Fn = (...args: any[]) => any

declare interface Thenable<T> {
    /**
     * 暴露出不可转为 rejected 状态的 Promise
     * */
    then(resolveFn: Fn, rejectFn?: Fn): Promise<T>

    /**
     * 暴露出可转为 rejected 状态的 Promise
     * */
    toPromise(): Promise<T>
}
