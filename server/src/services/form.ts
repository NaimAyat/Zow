import { IForm, IResponse, IUser } from "../entities";

export interface IFormService {
  createNewForm(author: IUser): Promise<IForm>;
  getFormByID(id: string): Promise<IForm>;
  saveForm(form: IForm): Promise<void>;
  addResponse(formID: string, response: IResponse): Promise<void>;
  addOwner(formID: string, newOwner: IUser): Promise<void>;
}
