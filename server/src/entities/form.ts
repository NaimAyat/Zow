import { IInterviewSlot } from "./interviewSlot";
import { IQuestion } from "./question";
import { IResponse } from "./response";
import { IUser } from "./user";

export interface IForm {
  id: string;
  owners: [IUser];
  questions: [IQuestion];
  responses: [IResponse];
  interviewSlots: [IInterviewSlot];
}
