export interface FormItem {
    id?: string
    name: string
    value: string
    label: string
    placeholder?: string
}

export class FormManage {
    constructor(props: FormItem[]) {
        console.log('props', props)
    }
}
