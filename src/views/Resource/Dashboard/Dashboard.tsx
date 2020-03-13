import React, { useState, useEffect } from 'react'
import List from './Components/List/List'
import './Dashboard.scss'
import { getList } from '@/api/List'
import { TeachingPoint } from '@/api/types/List.type'
import SaInput from '@/common/components/SaInput/SaInput'
import SaButton from '@/common/components/SaButton/SaButton'
import ClientFooter from '@/common/components/ClientFooter/ClientFooter'

const Dashboard: React.FC = () => {
    const [val, setVal] = useState<string>('')
    const [list, setList] = useState<TeachingPoint[]>([])

    const onSearch = () => {
        getListFunc(val)
    }

    const getListFunc = (value = '') => {
        getList(value).then(res => {
            setList(res)
        })
    }

    useEffect(() => {
        getListFunc()
    }, [])

    return (
        <div>
            <div className="search">
                <SaInput
                    value={val}
                    onChange={(
                        e: React.ChangeEvent<
                            HTMLInputElement | HTMLTextAreaElement
                        >,
                    ) => {
                        setVal(e.target.value)
                    }}
                />
                <SaButton fill onClick={onSearch}>
                    搜索1
                </SaButton>
            </div>
            <List list={list} />
            <ClientFooter />
        </div>
    )
}

export default Dashboard
