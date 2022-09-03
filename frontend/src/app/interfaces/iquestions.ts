export interface IQuestionsResponse{
    success: boolean
    errorMessage: string
    responseResult: IQuestion[]
}

export interface IQuestion {
    id: number
    type: string
    label: string
    answer?: string
    sugestedAnswers?: string
    answers: string []
    tabId: number
    status: boolean
}