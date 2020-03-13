declare const global: any
declare const window: any

export const isBrowser =
    typeof window !== 'undefined' &&
    typeof Window !== 'undefined' &&
    window &&
    Window &&
    window instanceof Window

export function isWeiXin() {
    const ua = isBrowser ? navigator.userAgent : ''
    const reg = /MicroMessenger/i
    return reg.test(ua)
}

if (!isBrowser) {
    /** Server render */
    global.window = { document: {} }
}

const compatibleArr = ['File', 'FileList']

compatibleArr.forEach((key: string) => {
    if (isBrowser) {
        /** IE9 */
        if (!window[key]) window[key] = Object
    } else if (!(global as any)[key]) {
        /** Node */
        global[key] = Object
    }
})
