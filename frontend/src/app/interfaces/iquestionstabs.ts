import { IQuestion } from "./iquestions";

export type IQuestionsByTabResponse = ITabJoined[]

export interface ITabJoined {
  id: number
  name: string
  label: string
  questionsTab: IQuestion[];
}

// export interface IQuestionByTab {
//   id: number
//   type: string
//   label: string
//   answer?: string
//   sugestedAnswers?: string
//   tabId: number
//   status: boolean
// }
