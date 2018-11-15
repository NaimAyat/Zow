export interface IQuestion {
  prompt: string;
  options?: string[];
  type: QuestionType;
}

export type QuestionType =
  | "radio"
  | "checkBox"
  | "email"
  | "phone"
  | "shortText"
  | "longText"
  | "dropDown";

export interface IAnswer {
  // question: IQuestion;
  answer: string;
}

export interface IResponse {
  email: string;
  answers: IAnswer[];
}

export interface IScore {
  email: string;
  score: string;
}
