import React from 'react'
import './List.scss'
import { TeachingPoint } from '@/api/types/List.type'
import SaButton from '@/common/components/SaButton/SaButton'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Toast from '@/common/components/Toast/Toast'

interface ListProps {
    list: TeachingPoint[]
}

const List: React.FC<ListProps> = ({ list }) => {
    const handleCopy = () => {
        Toast.success('一键复制成功, 小可爱可以去粘贴啦! ~(≧▽≦)/~')
    }
    return (
        <ul className="dashbord-list">
            {list.map(item => {
                return (
                    <li className="dashbord-item" key={item.id}>
                        <p className="item-title">{item.title}</p>
                        <img src={item.content.imgurls[0]} alt="" />
                        <span>{item.content.desc}</span>
                        <CopyToClipboard
                            text={item.content.desc}
                            onCopy={handleCopy}
                        >
                            <SaButton className="dashbord-item-copy">
                                复制
                            </SaButton>
                        </CopyToClipboard>
                    </li>
                )
            })}
        </ul>
    )
}

export default List
