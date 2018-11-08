import getConfig, { IConfig } from "./index";

jest.mock("fs");

const enabledConfig = `{
  "SENDGRID_API_KEY": "test key",
  "SENDGRID_FROM_EMAIL": "test address",
  "SENDGRID_ENABLE": true
}`;

const disabledConfig = `{
  "SENDGRID_API_KEY": "test key",
  "SENDGRID_FROM_EMAIL": "test address",
  "SENDGRID_ENABLE": false
}`;

describe("getConfig", () => {
  describe("reading config file succeeds", () => {
    let config: IConfig;
    let fs;

    beforeEach(() => {
      fs = require("fs");
      fs.existsSync = () => true;
    });

    describe("SendGrid is enabled", () => {
      beforeEach(() => {
        fs.readFileSync = () => enabledConfig;

        config = getConfig();
      });

      test("config reads the SendGrid API key", () => {
        expect(config.getEmailerKey()).toBe("test key");
      });

      test('config reads the SendGrid "from" email address', () => {
        expect(config.getEmailerFromAddress()).toBe("test address");
      });
    });

    describe("SendGrid is disabled", () => {
      beforeEach(() => {
        fs.readFileSync = () => disabledConfig;

        config = getConfig();
      });

      test("config returns no API key", () => {
        expect(config.getEmailerKey()).toBe(undefined);
      });

      test('config returns no "from" email address', () => {
        expect(config.getEmailerFromAddress()).toBe(undefined);
      });
    });
  });

  describe("config file does not exist", () => {
    let config: IConfig;

    beforeEach(() => {
      const fs = require("fs");
      fs.existsSync = () => false;

      config = getConfig();
    });

    test("config returns no API key", () => {
      expect(config.getEmailerKey()).toBeUndefined();
    });

    test('config returns no "from" email address', () => {
      expect(config.getEmailerFromAddress()).toBeUndefined();
    });
  });
});
