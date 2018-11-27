export interface IQuestion {
  prompt: string;
  options?: string[];
  type: QuestionType;
}

export type QuestionType =
  | "radio"
  | "checkbox"
  | "email"
  | "phone"
  | "shortText"
  | "longText"
  | "dropdown";

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

export interface ISlot {
  start: Date;
  end: Date;
}
