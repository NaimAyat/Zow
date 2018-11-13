import { IForm, IResponse, IUser, IQuestion } from "../entities";

export interface IFormService {
  // Accessors
  getFormByID(id: string): Promise<IForm>;
  getFormsByUser(user: IUser): Promise<[IForm]>;
  getQuestions(formID: string): Promise<[IQuestion]>;
  getResponses(formID: string): Promise<[IResponse]>;
  //Mutators
  saveForm(form: IForm): Promise<void>;
  createNewForm(author: IUser): Promise<IForm>;
  addResponse(formID: string, response: IResponse): Promise<void>;
  addOwner(formID: string, newOwner: IUser): Promise<void>;
}
