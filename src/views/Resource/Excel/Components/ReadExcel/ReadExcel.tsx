import React, { useEffect, ChangeEvent } from 'react'
import './ReadExcel.scss'
import { LoadXlsxCoreScript } from './utils'

declare global {
    interface Window {
        XLSX: any
    }
}

export interface ReadExcelChange {
    onChange: (data: any) => void
}

const ReadExcel: React.FC<ReadExcelChange> = ({ onChange }) => {
    const fileChange = (e: ChangeEvent<any>) => {
        var files = e.target.files
        var fileReader = new FileReader()
        fileReader.onload = function(ev: any) {
            try {
                var data = ev.target.result
                var workbook = window.XLSX.read(data, {
                    type: 'binary',
                }) // 以二进制流方式读取得到整份excel表格对象
                var rooms: any = {} // 存储获取到的数据
            } catch (error) {
                console.log('文件类型不正确, 请重新选择文件')
                return
            }

            // 表格的表格范围，可用于判断表头是否数量是否正确
            var fromTo = ''
            // 遍历没一张sheet并读取内容
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref']
                    if (!fromTo) {
                        console.log('文件内容为空, 导入失败')
                        return
                    }
                    rooms[sheet] = window.XLSX.utils.sheet_to_json(
                        workbook.Sheets[sheet],
                    )
                    // break // 如果只取第一张表，就取消注释这行
                }
            }
            onChange(rooms)
        }
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(files[0])
    }

    useEffect(() => {
        LoadXlsxCoreScript().then(() => {})
    }, [])

    return (
        <div className="read-excel">
            <form id="addMultiFm">
                <input
                    type="file"
                    name="file"
                    className="am-form-field"
                    onChange={fileChange}
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    required
                />
            </form>
            <div className="batchImportHouse">手动添加</div>
        </div>
    )
}

export default ReadExcel
