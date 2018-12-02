export interface IQuestion {
  prompt: string;
  options?: string[];
  type: QuestionType;
}

export type QuestionType =
  | "RADIO"
  | "CHECKBOX"
  | "EMAIL"
  | "PHONE"
  | "SHORT_TEXT"
  | "LONG_TEXT"
  | "DROPDOWN";

export interface IAnswer {
  // question: IQuestion;
  value: string;
}

export interface IResponse {
  email: string;
  answers: IAnswer[];
  status?: "Pending" | "Approved" | "Rejected";
}

export interface IScore {
  email: string;
  score: string;
}

export interface ISlot {
  start: Date;
  end: Date;
}
