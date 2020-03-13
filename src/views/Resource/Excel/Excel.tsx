import React, { useState } from 'react'
import './Excel.scss'
import ReadExcel from './Components/ReadExcel/ReadExcel'
import PageItem from './Components/PageItem/PageItem'
import SaButton from '@/common/components/SaButton/SaButton'

const Excel: React.FC = () => {
    const [excelData, setExcelData] = useState<any>([])
    const [isDownload, setDonwload] = useState<boolean>(false)
    const ReadExcelChange = (data: any) => {
        // console.log('data', data)
        // console.log('Object.keys(data)', Object.values(data))
        const wip_data = Object.values(data).reduce(
            (pre: any, item: any, index) => {
                const label = item.reduce((p: any, i: any, ii: number) => {
                    if (ii % 15 === 0) {
                        p[`pagesize` + parseInt(String(ii / 15))] = []
                    }
                    p[`pagesize` + parseInt(String(ii / 15))].push(i)
                    return p
                }, {})
                pre.push(label)
                return pre
            },
            [],
        )
        console.log('wip_data', wip_data)
        setExcelData(wip_data)
    }

    const batchDownload = () => {
        setDonwload(true)
    }

    return (
        <div>
            <ReadExcel onChange={ReadExcelChange} />
            <SaButton onClick={batchDownload}>批量下载</SaButton>
            {excelData.map((province: any, provinceIndex: number) => (
                <div className="province" key={provinceIndex}>
                    {Object.values(province).map(
                        (pageItem: any, pageItemIndex: number) => (
                            <PageItem
                                pageItem={pageItem}
                                key={pageItemIndex}
                                isDownload={isDownload}
                            />
                        ),
                    )}
                </div>
            ))}
        </div>
    )
}

export default Excel
