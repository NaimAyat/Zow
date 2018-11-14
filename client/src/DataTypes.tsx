export interface IQuestion {
  prompt: string;
  options?: string[];
  type: string;
}

export interface IAnswer {
  question: IQuestion;
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
