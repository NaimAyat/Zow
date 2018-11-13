import bcrypt from "bcrypt";

const saltRounds = 10;

export interface IEncryptService {
  testPassword(password: string, passwordHash: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

class BcryptAuthService implements IEncryptService {
  public async testPassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }
}

export default function getDefaultEncryptService(): IEncryptService {
  return new BcryptAuthService();
}
