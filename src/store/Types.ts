export interface SagaAction {
    type: string
    payload?: {
        done?(...args: any[]): any

        [key: string]: any
        [key: number]: any
    }
}
