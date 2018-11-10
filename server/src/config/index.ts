import fs from "fs";
import path from "path";

export interface IConfig {
  getEmailerKey?(): string;
  getEmailerFromAddress?(): string;
}

class FileConfig implements IConfig {
  private sendGridKey?: string;
  private fromAddress?: string;

  constructor() {
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
    }
  }

  public getEmailerKey?() {
    return this.sendGridKey;
  }

  public getEmailerFromAddress() {
    return this.fromAddress;
  }
}

export default function getDefaultConfig(): IConfig {
  const config = new FileConfig();
  return config;
}
