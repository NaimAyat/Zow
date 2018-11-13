import fs from "fs";
import path from "path";

export interface IConfig {
  getEmailerKey?(): string;
  getEmailerFromAddress?(): string;
  getDbUri(): string;
  getSessionSecret(): string;
}

const privateConfigPath = path.join(
  __dirname,
  "..",
  "..",
  "config",
  "private.json"
);

const publicConfigPath = path.join(
  __dirname,
  "..",
  "..",
  "config",
  "public.json"
);

class FileConfig implements IConfig {
  private sendGridKey?: string;
  private fromAddress?: string;
  private dbUri: string;
  private sessionSecret: string;

  constructor() {
    // public configuration
    let enableSendgrid = false;
    if (fs.existsSync(publicConfigPath)) {
      const config = JSON.parse(fs.readFileSync(publicConfigPath, "utf8"));
      this.dbUri = config.DB_URI;
      if (config.SENDGRID_ENABLE) {
        enableSendgrid = true;
      }
    }

    // private configuration
    if (fs.existsSync(privateConfigPath)) {
      const config = JSON.parse(fs.readFileSync(privateConfigPath, "utf8"));
      this.sessionSecret = config.SESSION_SECRET;
      if (enableSendgrid) {
        this.sendGridKey = config.SENDGRID_API_KEY;
        this.fromAddress = config.SENDGRID_FROM_EMAIL;
      }
    }
  }

  public getEmailerKey?() {
    return this.sendGridKey;
  }

  public getEmailerFromAddress() {
    return this.fromAddress;
  }

  public getDbUri() {
    return this.dbUri;
  }

  public getSessionSecret() {
    return this.sessionSecret;
  }
}

export default function getDefaultConfig(): IConfig {
  const config = new FileConfig();
  return config;
}
