export interface IFormService {
  createNewForm();
  saveForm(formID: string, questions);
  addResponse(formID: string, response);
}
