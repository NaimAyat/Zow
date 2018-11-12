import { IAnswer } from "./Answer";
import { IUser } from "./User";

interface IScore {
  score: number;
  notes: string;
  user: IUser;
}

export interface IResponse {
  respondent: string;
  answers: [IAnswer];
  scores: [IScore];
}
