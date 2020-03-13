import { singletonObj } from '@livelybone/singleton'

export function LoadXlsxCoreScript() {
    return singletonObj('LoadXlsxCoreScript', () => {
        const dom = document.createElement('script')
        dom.type = 'text/javascript'
        dom.async = true
        dom.src = 'https://cdn.bootcss.com/xlsx/0.11.5/xlsx.core.min.js'
        document.head.appendChild(dom)
        return new Promise(res => (dom.onload = res))
    })
}
