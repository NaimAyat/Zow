import Koa from "koa";
import { IConfig } from "../config";
import getEmailer, { IEmailer } from "../email";

export interface IEmailService {
  sendMessage(
    ctx: Koa.Context,
    recipient: string,
    subject: string,
    message: string
  ): Promise<void>;

  sendApproval(
    ctx: Koa.Context,
    recipient: string,
    formTitle: string
  ): Promise<void>;

  sendRejection(
    ctx: Koa.Context,
    recipient: string,
    formTitle: string
  ): Promise<void>;

  sendInterviewRequest(
    ctx: Koa.Context,
    recipient: string,
    formTitle: string,
    scheduleURL: string
  ): Promise<void>;

  sendInterviewConfirmation(
    ctx: Koa.Context,
    recipient: string,
    formTitle: string,
    interviewSlot: string
  ): Promise<void>;
}

class ConcreteEmailService implements IEmailService {
  private config: IConfig;
  constructor(config: IConfig) {
    this.config = config;
    this.emailer = getEmailer(this.config);
  }

  private async sendMessage(
    ctx: Koa.Context,
    recipient: string,
    subject: string,
    message: string
  ): Promise<boolean> {
    await this.emailer.send(recipient, subject, message);
  }

  public async sendApproval(
    ctx: Koa.Context,
    recipient: string,
    formTitle: string
  ): Promise<void> {
    var subject = "You've been accepted!";
    var message = `Thank you for applying for ${formTitle}. The board was
     impressed by your response and has decided to approve your application!
     Stay tuned for more details.`;
    sendMessage(recipient, subject, message);
  }

  public async sendRejection(
    ctx: Koa.Context,
    recipient: string,
    formTitle: string
  ): Promise<void> {
    var subject = "Application Decision";
    var message = `Thank you for applying for ${formTitle}. The board was
    impressed by your response but has decided to move forward with different
    applicants at this time. Please understand that this does not speak to your
    self-worth as each one of you is individually special to us in our hearts. We
    are unfortunately unable to provide specific feedback at this time and
    we do not read responses to this e-mail address. We will keep your information
    in our system and reach out if there is a good fit, but do not even think about
    applying again or we will automatically ban you from our system. Best wishes,
    the board.`;
    sendMessage(recipient, subject, message);
  }

  public async sendInterviewRequest(
    ctx: Koa.Context,
    recipient: string,
    formTitle: string,
    scheduleURL: string
  ): Promise<void> {
    //TODO
  }

  public async sendInterviewConfirmation(
    ctx: Koa.Context,
    recipient: string,
    formTitle: string,
    interviewSlot: string
  ): Promise<void> {
    //TODO
  }

}

export default function getDefaultEmailService(
  config: IConfig,
) {
  return new ConcreteEmailService(config, encryptService);
}
