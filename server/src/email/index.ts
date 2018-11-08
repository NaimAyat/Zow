import sgMail from "@sendgrid/mail";

export interface IEmailer {
  send(recipient: string, subject: string, message: string): Promise<void>;
}

class PhonyEmailer implements IEmailer {
  public async send(recipient: string, subject: string, message: string) {
    console.log(`PHONY sending email to ${recipient}`);
  }
}

class SendGridEmailer implements IEmailer {
  private fromEmail: string;

  constructor(API_KEY: string, fromEmail: string) {
    sgMail.setApiKey(API_KEY);
    this.fromEmail = fromEmail;
  }

  public async send(recipient: string, subject: string, message: string) {
    await sgMail.send({
      to: recipient,
      from: this.fromEmail,
      subject,
      text: message,
      html: message
    });
  }
}

export default function getEmailer(
  apiKey?: string,
  fromEmail?: string
): IEmailer {
  if (apiKey && fromEmail) {
    return new SendGridEmailer(apiKey, fromEmail);
  }

  return new PhonyEmailer();
}
