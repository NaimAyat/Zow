import { IInterviewSlot } from "./InterviewSlot";
import { IQuestion } from "./Question";
import { IResponse } from "./Response";
import { IUser } from "./User";

export interface IForm {
  owners: [IUser];
  questions: [IQuestion];
  responses: [IResponse];
  interviewSlots: [IInterviewSlot];
}
