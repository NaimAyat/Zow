import { IQuestion } from "./question";

export interface IAnswer {
  id: string;
  question: IQuestion;
  value: string;
}
