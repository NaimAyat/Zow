import { IForm, IResponse, IUser, IQuestion } from "../entities";
import { Context } from "koa";
import { Form } from "../db/models";

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
   * Retrieves all IForms for a given user provided in the context
   * @return IForms for given user
   */
  getOwnedForms(ctx: Context): Promise<IForm[]>;
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
    const form = await Form.findById(id).populate("owners questions");
    if (!form) {
      throw new Error("form does not exist");
    }

    return { id: form.id, name: form.id };
  }

  public async getOwnedForms(ctx: Context): Promise<IForm[]> {
    console.log("Getting forms for user", ctx.session.user.id);
    try {
      // const ownerID = mongoose.Types.ObjectId(ctx.session.user.id);
      console.log("Got objectID");
      const forms = await Form.find({
        owners: ctx.session.user.id
      });
      console.log("Got forms", forms);
      return forms;
    } catch (e) {
      console.error(e);
    }
  }

  public async getQuestions(
    ctx: Context,
    formID: string
  ): Promise<IQuestion[]> {
    const form = await Form.findById(formID).populate("questions");
    if (!form) {
      throw new Error("form does not exist");
    }
    return form.questions;
  }

  public async getResponses(
    ctx: Context,
    formID: string
  ): Promise<IResponse[]> {
    const form = await Form.findById(formID).populate("owners responses");
    if (!form) {
      throw new Error("form does not exist");
    }
    if (
      !ctx.session.user ||
      form.owners.find(user => user.id === ctx.session.user.id) === undefined
    ) {
      throw new Error("access not allowed");
    }
    return form.responses;
  }

  public async saveForm(ctx: Context, form: IForm): Promise<void> {
    return; // TODO
  }

  public async createNewForm(ctx: Context, author: IUser): Promise<IForm> {
    if (!author) {
      throw new Error("access not allowed");
    }
    const form = await Form.create({ name: "New Form", owners: [author.id] });
    return { id: form.id };
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
