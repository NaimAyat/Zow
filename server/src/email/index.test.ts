import getEmailer, { IEmailer } from "./index";

jest.mock("@sendgrid/mail");

describe("getEmailer", () => {
  describe("API key is unset", () => {
    let emailer: IEmailer;

    beforeEach(() => {
      emailer = getEmailer(undefined, undefined);
    });

    test("it returns an emailer", () => {
      expect(emailer).toHaveProperty("send");
    });

    test("send does not throw an error", async () => {
      await emailer.send("test@example.com", "subject", "Hello, world!");
    });
  });

  describe("API key is set", () => {
    let emailer: IEmailer;
    let sgMail;

    beforeEach(() => {
      sgMail = require("@sendgrid/mail");
      sgMail.setApiKey = jest.fn();
      sgMail.send = jest.fn().mockResolvedValue(undefined);

      emailer = getEmailer("APIKEY", "from@example.com");
    });

    test("it returns an emailer", () => {
      expect(emailer).toHaveProperty("send");
    });

    test("it activates the API", () => {
      expect(sgMail.setApiKey.mock.calls.length).toBe(1);
    });

    test("send calls the SendGrid library", async () => {
      await emailer.send("recipient", "subject", "message");
      expect(sgMail.send.mock.calls.length).toBe(1);
      const data = sgMail.send.mock.calls[0][0];
      expect(data.to).toBe("recipient");
      expect(data.subject).toBe("subject");
      expect(data.text).toBe("message");
    });
  });
});
