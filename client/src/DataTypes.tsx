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
  id?: string;
  email: string;
  answers: IAnswer[];
  status?: "Pending" | "Approved" | "Rejected";
  scoring?: IScore[];
}

export interface IScore {
  // user: {
  //   email: string;
  // };
  score: number;
}

export interface ISlot {
  start: Date;
  end: Date;
}

export type FilterType = "less than" | "greater than" | "matches" | "includes";

export interface IFilter {
  prompt: string;
  type: FilterType;
  search: string;
}
