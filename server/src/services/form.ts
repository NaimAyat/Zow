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
   * Overwrites given form in database if exists, creates if it does not.
   *
   * @param form
   *          IForm to upsert in database
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
   * @return the added response
   */
  addResponse(ctx: Context, formID: string, answers: string[]): Promise<IResponse>;
  /**
   * Associates an owner with a given form.
   *
   * @param formID
   *          form ID associate owner with
   * @param newOwner
   *          e-mail address of user to add as owner to form
   *
   * @return the added owner
   */
  addOwner(ctx: Context, formID: string, newOwner: string): Promise<IUser>;
  /**
   * Adds a scoring to a response.
   *
   * @param responseID
   *          response ID associate score with
   * @param score
   *          score object to add to response
   *
   * @return the updated response
   */
  addScore(ctx: Context, responseID: string, score: IScore): Promise<IResponse>;
  /**
   * Retrieves average score for a given response.
   *
   * @param responseID
   *          response ID for which to aggregate scores
   *
   * @return average of all scores associated with the response
   */
  getAvgScore(ctx: Context, responseID: string): Promise<number>;
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
    if (!ctx.session.user) {
      throw new Error("access not allowed");
    }
    const form = await Form.findOneAndUpdate({id:form.id}, form, {upsert:true}, function(err,form) {
      if (err) throw new Error("Could not save form");
    });
    return;
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
    respondent: string,
    formID: string,
    answers: string[]
  ): Promise<IResponse> {
    const response = await Response.create({ respondent: respondent, answers: answers });
    const form = await Form.findById(form.id);
    if (!form) {
      throw new Error("Form not found");
    }
    form.responses.push(response);
    form.markModified('responses');
    form.save();
    return { id: response.id };
  }

  public async addOwner(
    ctx: Context,
    formID: string,
    newOwner: string
  ): Promise<IUser> {
    const form = await Form.findById(formID);
    if (!form) {
      throw new Error("Form not found");
    }
    if (
      !ctx.session.user ||
      form.owners.find(user => user.id === ctx.session.user.id) === undefined
    ) {
      throw new Error("Access not allowed");
    }
    const owner = await User.findOne({email:newOwner});
    if (!owner) {
      throw new Error("User not found with provided e-mail address")
    }
    form.owners.push(owner);
    form.markModified('owners');
    form.save();
    // TODO: Send e-mail update to new owner
    return { id: newOwner.id };

  }

  public async addScore(
    ctx: Context,
    responseID: string,
    score: IScore
  ): Promise<IResponse> {
    var query = {'id': responseID};
    const response = await Response.findById(responseID);
    if (!response) {
      throw new Error("Response not found");
    }
    response.scoring.push(score);
    response.markModified('scoring');
    response.save();
    return {id: response.id};
  }

  public async getAvgScore(
    ctx: Context,
    responseID: string
  ): Promise<number> {
    const form = await Form.findById(formID).populate('scoring');
    var sum = 0;
    var numScores = form.scoring.length;
    for (var score of form.scoring) {
      sum += score;
    }
    if (numScores < 1) {
      return -1;
    }
    else {
      return sum / numScores;
    }
  }
}
