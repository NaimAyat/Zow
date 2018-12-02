import { IForm, IResponse, IUser, IQuestion, IScore } from "../entities";
import { Context } from "koa";
import { Form, Question, Answer, Response, User } from "../db/models";
import { IEmailService } from "./email"

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
   * @param email
   *          email address of submiter
   * @param answers
   *          array of answers to include in response
   *
   * @return the added response
   */
  addResponse(
    ctx: Context,
    formID: string,
    email: string,
    answers: string[]
  ): Promise<IResponse>;
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

  /**
   * Sets the public status of a form
   * @param ctx
   * @param formID ID of form to modify
   * @param published true - publish form, false - unpublish form
   */
  setPublishState(
    ctx: Context,
    formID: string,
    published: boolean
  ): Promise<void>;
}

export class DatabaseFormService implements IFormService {

  private emailService: IEmailService;
  constructor(emailService: IEmailService) {
    this.emailService = emailService;
  }

  public async getFormByID(ctx: Context, id: string): Promise<IForm> {
    // TODO: filter info
    const form = await Form.findById(id).populate("owners questions");
    if (!form) {
      throw new Error("form does not exist");
    }

    return { id: form.id, name: form.name, published: form.published };
  }

  public async getOwnedForms(ctx: Context): Promise<IForm[]> {
    try {
      const forms = await Form.find({
        owners: ctx.session.user.id
      });
      return forms;
    } catch (e) {
      console.error(e);
    }
  }

  public async getQuestions(
    ctx: Context,
    formID: string
  ): Promise<IQuestion[]> {
    const form = await Form.findById(formID).populate("questions owners");
    if (!form) {
      throw new Error("form does not exist");
    }

    if (
      !form.published &&
      form.owners.find(user => user.id === ctx.session.user.id) === undefined
    ) {
      throw new Error("access not allowed");
    }

    return form.questions;
  }

  public async getResponses(
    ctx: Context,
    formID: string
  ): Promise<IResponse[]> {
    const form = await Form.findById(formID)
      .populate("owners")
      .populate({
        path: "responses",
        model: "Response",
        populate: {
          path: "answers",
          model: "Answer"
        }
      });
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
    const formInDB = await Form.findById(form.id).populate("owners");

    if (
      !ctx.session.user ||
      !formInDB ||
      formInDB.owners.find(user => user.id === ctx.session.user.id) ===
        undefined
    ) {
      throw new Error("access not allowed");
    }

    formInDB.name = form.name;
    formInDB.questions = [];
    for (const question of form.questions) {
      formInDB.questions.push(await Question.create(question));
    }

    await formInDB.save();
  }

  public async createNewForm(ctx: Context, author: IUser): Promise<IForm> {
    if (!author) {
      throw new Error("access not allowed");
    }

    const emailQuestion = await Question.create({
      prompt: "Email",
      type: "EMAIL"
    });
    const form = await Form.create({
      name: "",
      owners: [author.id],
      questions: [emailQuestion]
    });
    return { id: form.id };
  }

  public async addResponse(
    ctx: Context,
    formID: string,
    email: string,
    answers: string[]
  ): Promise<IResponse> {
    const form = await Form.findById(formID);
    if (!form) {
      throw new Error("Form not found");
    }

    const answerObjects = await Promise.all(
      answers.map(
        async (answer, i) =>
          (await Answer.create({
            value: answer,
            question: form.questions[i]
          }))._id
      )
    );

    const response = await Response.create({
      email,
      answers: answerObjects
    });

    form.responses.push(response);
    form.markModified("responses");
    await form.save();

    return response;
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
    const owner = await User.findOne({ email: newOwner });
    // TODO: Accept e-mail addresses of users w/o an account
    if (!owner) {
      throw new Error("User not found with provided e-mail address");
    }
    form.owners.push(owner);
    form.markModified("owners");
    await form.save();
    // TODO: Send e-mail update to new owner
    return owner;
  }

  public async addScore(
    ctx: Context,
    responseID: string,
    score: IScore
  ): Promise<IResponse> {
    const query = { id: responseID };
    const response = await Response.findById(responseID);
    if (!response) {
      throw new Error("Response not found");
    }
    response.scoring.push(score);
    response.markModified("scoring");
    await response.save();
    return response;
  }

  public async getAvgScore(ctx: Context, responseID: string): Promise<number> {
    const response = await Response.findById(responseID).populate("scoring");
    let sum = 0;
    const numScores = response.scoring.length;
    for (const score of response.scoring) {
      sum += score.score;
    }
    if (numScores < 1) {
      return 0;
    } else {
      return sum / numScores;
    }
  }

  public async setPublishState(
    ctx: Context,
    formID: string,
    published: boolean
  ): Promise<void> {
    const form = await Form.findById(formID).populate("owners");
    if (!form) {
      throw new Error("Form not found");
    }
    if (
      !ctx.session.user ||
      form.owners.find(user => user.id === ctx.session.user.id) === undefined
    ) {
      throw new Error("Access not allowed");
    }

    form.published = published;
    await form.save();
  }
}

export default function getDefaultFormService(
  emailService: IEmailService
) {
  return new DatabaseFormService(emailService);
}
