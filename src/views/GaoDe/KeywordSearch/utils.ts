import { singletonObj } from '@livelybone/singleton'

export function loadGaoDeMapScript() {
    const key = '5cef8087534491d255990eb5883440f6'
    return singletonObj('loadGaoDeMapScript', () => {
        const dom = document.createElement('script')
        dom.type = 'text/javascript'
        dom.async = true
        dom.src = `https://webapi.amap.com/maps?v=1.4.15&key=${key}`
        document.head.appendChild(dom)
        return new Promise(res => (dom.onload = res))
    })
}

export function resetGaoDeMap(sc: any) {
    try {
        if (sc) sc.reset()
    } catch (error) {
        console.warn('ResetGaoDeMap reset error', error)
    }
}
