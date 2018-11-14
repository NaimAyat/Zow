import { IAnswer } from "./answer";
import { IUser } from "./user";

interface IScore {
  score: number;
  notes: string;
  user: IUser;
}

export interface IResponse {
  id?: any;
  respondent: string;
  answers: IAnswer[];
  scores: IScore[];
}
