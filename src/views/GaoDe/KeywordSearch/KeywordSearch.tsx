import React, { useState, useEffect, useCallback, useRef } from 'react'
import './KeywordSearch.scss'
import SaButton from '@/common/components/SaButton/SaButton'
import { loadGaoDeMapScript } from './utils'
import Toast from '@/common/components/Toast/Toast'
import SaQueryList, {
    SaQueryRef,
} from '@/common/components/SaQueryList/SaQueryList'
import { areasData, ProvinceCityAreas } from '@/common/utils/area.data'
import SaInput from '@/common/components/SaInput/SaInput'

export type ProvinceCityAreasRequired = Required<ProvinceCityAreas>

const JiangSuData = areasData.filter(
    item => item.value === '320000',
)[0] as ProvinceCityAreasRequired

const KeywordSearch: React.FC = () => {
    const [list, setList] = useState<PoisItem[]>([])
    const QueryRef = useRef<SaQueryRef>(null)
    const [areas, setAreas] = useState<ProvinceCityAreas>(
        JiangSuData.children[0],
    )
    const [activeIndex, setActiveIndex] = useState<any>(0)
    const [val, setVal] = useState<string>('')
    const getData = useCallback(
        (params: any) => {
            return new Promise((res, rej) => {
                loadGaoDeMapScript().then(() => {
                    AMap.service(['AMap.PlaceSearch'], function() {
                        //构造地点查询类
                        var placeSearch = new AMap.PlaceSearch(params)
                        //关键字查询
                        placeSearch.search(
                            val || '委党校',
                            (status, result) => {
                                if (status !== 'complete') {
                                    Toast.error('请求报错')
                                    return
                                }
                                res(result.poiList)
                            },
                        )
                    })
                })
            })
        },
        [val],
    )

    const onQuery = useCallback(
        (pageInfo: any = { pageIndex: 1, pageSize: 50 }) => {
            return getData({
                ...{
                    pageSize: 50,
                    city: areas.children && areas.children[activeIndex].value, // 兴趣点城市
                    citylimit: true, //是否强制限制在设置的城市内搜索
                },
                ...{
                    pageIndex: pageInfo.pageIndex,
                },
            }).then((res: any) => {
                setList(res.pois as PoisItem[])
                return res
            })
        },
        [activeIndex, areas.children, getData],
    )

    useEffect(() => {
        onQuery()
    }, [activeIndex, onQuery])

    return (
        <div className="keyword-search">
            <div className="search-content">
                <p className="province-name">{JiangSuData.label}:</p>
                <div className="city-area">
                    <ul className="city-content">
                        {JiangSuData.children!.map(item => (
                            <li
                                key={item.value}
                                onClick={() => {
                                    setAreas(item)
                                    setActiveIndex(0)
                                }}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                    <ul className="area-content">
                        {areas.children &&
                            areas.children.map((item, index) => (
                                <li
                                    className={
                                        activeIndex === index ? 'active' : ''
                                    }
                                    key={item.value}
                                    onClick={() => {
                                        setActiveIndex(index)
                                    }}
                                >
                                    {item.label}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="search-btn">
                    <SaInput
                        placeholder="默认是'委党校'"
                        onChange={(e: any) => {
                            setVal(e.target.value)
                        }}
                    />
                    <SaButton onClick={onQuery}>查询</SaButton>
                </div>
            </div>

            <SaQueryList
                onQuery={onQuery}
                className="pois-list-query-result"
                ref={QueryRef}
            >
                <div className="keyword-search-content">
                    {list.map((item, index) => (
                        <div key={item.id} className="pois-item">
                            <p>{index + 1}:</p>
                            <p>
                                <span>名字：</span> {item.name}
                            </p>
                            <p>
                                <span>地址：</span>{' '}
                                {item.address || '此地区暂无地址'}
                            </p>
                            <p>
                                <span>电话：</span>{' '}
                                {item.tel || '此地区暂无电话'}
                            </p>
                            <p>
                                <span>邮编：</span>
                                {areas.children &&
                                    areas.children[activeIndex].value}
                            </p>
                        </div>
                    ))}
                </div>
            </SaQueryList>
        </div>
    )
}

export default KeywordSearch
