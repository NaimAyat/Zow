import { IQuestion } from "./Question";

export interface IAnswer {
  question: IQuestion;
  value: string;
}
