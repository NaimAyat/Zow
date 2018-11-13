import { IQuestion } from "./question";

export interface IAnswer {
  id?: any;
  question: IQuestion;
  value: string;
}
