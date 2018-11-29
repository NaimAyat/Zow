import { IForm, IResponse, IUser, IQuestion } from "../entities";
import { Context } from "koa";
import { Form } from "../db/models";
import { fromString } from "long";

export interface IFormService {
  // Accessors
  /**
   * Retrieves an IForm given a form ID.
   * @param formID
   *          ID of form to retrieve
   * @return IForm for given ID
   */
  getFormByID(ctx: Context, id: string): Promise<IForm>;
  /**
   * Retrieves all IForms for a given user.
   * @param user
   *          IUser for which forms are retrieved
   * @return IForms for given user
   */
  getFormsByUser(ctx: Context, user: IUser): Promise<IForm[]>;
  /**
   * Retrieves IQuestions for given form.
   * @param formID
   *          form ID for which to retrieve questions
   * @return all associated IQuestions
   */
  getQuestions(ctx: Context, formID: string): Promise<IQuestion[]>;
  /**
   * Retrieves IResponses for given form.
   * @param formID
   *          form ID for which to retrieve responses
   * @return all associated IResponses
   */
  getResponses(ctx: Context, formID: string): Promise<IResponse[]>;

  // Mutators
  /**
   * Creates given form in database.
   *
   * @param form
   *          IForm to create in database
   *
   * @return void
   */
  saveForm(ctx: Context, form: IForm): Promise<void>;
  /**
   * Creates a new IForm for the given user.
   *
   * @param author
   *          user to associate form with
   *
   * @return the newly created IForm
   */
  createNewForm(ctx: Context, author: IUser): Promise<IForm>;
  /**
   * Associates a response with a given form.
   *
   * @param formID
   *          form ID associate response with
   * @param answers
   *          array of answers to include in response
   *
   * @return void
   */
  addResponse(ctx: Context, formID: string, answers: string[]): Promise<void>;
  /**
   * Associates an owner with a given form.
   *
   * @param formID
   *          form ID associate owner with
   * @param newOwner
   *          user to add as owner to form
   *
   * @return void
   */
  addOwner(ctx: Context, formID: string, newOwner: IUser): Promise<void>;
}

export class DatabaseFormService implements IFormService {
  public async getFormByID(ctx: Context, id: string): Promise<IForm> {
    // TODO: filter info
    return await Form.findById(id);
    // return { owners: [], questions: [], responses: [], interviewSlots: [] };
  }

  public async getFormsByUser(ctx: Context, user: IUser): Promise<IForm[]> {
    if (ctx.session.user.id === user.id) {
      return await Form.find({ owners: { $elemMatch: { $oid: user.id } } });
    }
  }

  public async getQuestions(
    ctx: Context,
    formID: string
  ): Promise<IQuestion[]> {
    console.log("REQUESTED FORM", formID);
    const form = await Form.findById(formID).populate("questions");
    console.log("GOT FORM", form);
    return form.questions;
  }

  public async getResponses(
    ctx: Context,
    formID: string
  ): Promise<IResponse[]> {
    // TODO: Authenticate
    const form = await Form.findById(formID);
    return form.responses;
  }

  public async saveForm(ctx: Context, form: IForm): Promise<void> {
    return; // TODO
  }

  public async createNewForm(ctx: Context, author: IUser): Promise<IForm> {
    return await Form.create({ owners: [author.id] });
  }

  public async addResponse(
    ctx: Context,
    formID: string,
    answers: string[]
  ): Promise<void> {
    return; // TODO
  }

  public async addOwner(
    ctx: Context,
    formID: string,
    newOwner: IUser
  ): Promise<void> {
    return; // TODO
  }
}
