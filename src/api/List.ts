import { TeachingPoint } from './types/List.type'
import resocurceData from './data/resource.json'
export function getList(params: string = '') {
    return new Promise<TeachingPoint[]>((resolve, reject) => {
        resolve(resocurceData.filter(item => item.title.indexOf(params) !== -1))
    })
}
