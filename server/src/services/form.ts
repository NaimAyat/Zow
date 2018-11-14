import { IForm, IResponse, IUser, IQuestion } from "../entities";
import { Context } from "koa";

export interface IFormService {
  // Accessors
  getFormByID(ctx: Context, id: string): Promise<IForm>;
  getFormsByUser(ctx: Context, user: IUser): Promise<[IForm]>;
  getQuestions(ctx: Context, formID: string): Promise<[IQuestion]>;
  getResponses(ctx: Context, formID: string): Promise<[IResponse]>;
  // Mutators
  saveForm(ctx: Context, form: IForm): Promise<void>;
  createNewForm(ctx: Context, author: IUser): Promise<IForm>;
  addResponse(ctx: Context, formID: string, answers: [string]): Promise<void>;
  addOwner(ctx: Context, formID: string, newOwner: IUser): Promise<void>;
}
