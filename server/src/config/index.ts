import fs from "fs";
import path from "path";

export interface IConfig {
  getEmailerKey?(): string;
  getEmailerFromAddress?(): string;
  getDbUri(): string;
}

class FileConfig {
  private sendGridKey?: string;
  private fromAddress?: string;
  private dbUri: string;

  public load() {
    const configPath = path.join(
      __dirname,
      "..",
      "..",
      "config",
      "config.json"
    );

    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
      if (config.SENDGRID_ENABLE) {
        this.sendGridKey = config.SENDGRID_API_KEY;
        this.fromAddress = config.SENDGRID_FROM_EMAIL;
      }
      this.dbUri = config.DB_URI;
    }
  }

  public getEmailerKey?() {
    return this.sendGridKey;
  }

  public getEmailerFromAddress() {
    return this.fromAddress;
  }

  public getDbUri() {
    return this.dbUri
  }
}

export default function getConfig(): IConfig {
  const config = new FileConfig();
  config.load();
  return config;
}
