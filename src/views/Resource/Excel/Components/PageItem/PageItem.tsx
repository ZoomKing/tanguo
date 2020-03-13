import React, { useEffect, useRef } from 'react'
import './PageItem.scss'
import domtoimage from 'dom-to-image'

interface PageItemParams {
    pageItem: any
    isDownload: boolean
}

const PageItem: React.FC<PageItemParams> = ({ pageItem, isDownload }) => {
    const PageItemRef = useRef<any>(null)

    useEffect(() => {
        if (isDownload) {
            download()
        }
    }, [isDownload])

    const download = () => {
        if (!PageItemRef) return
        domtoimage
            .toJpeg(PageItemRef.current, { quality: 0.95 })
            .then(dataUrl => {
                var link = document.createElement('a')
                link.download = `${new Date().getTime()}.jpeg`
                link.href = dataUrl
                link.click()
            })
    }
    return (
        <div className="page-item-box">
            <div className="page-item" ref={PageItemRef}>
                {pageItem.map((item: any, itemIndex: number) => (
                    <div className="province-item" key={itemIndex}>
                        <div className="province-item-border">
                            {Object.keys(item).map((i: any, iindex: number) =>
                                i === '邮编' || i === '地址' || i === '单位' ? (
                                    <p className="item" key={iindex}>
                                        <span>{i}：</span> {item[i]}
                                    </p>
                                ) : (
                                    ''
                                ),
                            )}
                            <p className="item">
                                <span>收件人：</span>干教处（科）
                            </p>
                            <p className="item">
                                <span>内容：</span>党政干部教育培训新趋势
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PageItem
