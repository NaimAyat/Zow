import bcrypt from "bcrypt";

const saltRounds = 10;

export interface IEncryptService {
  testPassword(password: string, passwordHash: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

class BcryptEncryptService implements IEncryptService {
  /**
   * Tests plaintext password against hashed password.
   *
   * @param password
   *          plaintext password to test
   * @param passwordHash
   *          hashed password to compare against
   *
   * @return true if passwords are equivalent, false otherwise
   */
  public async testPassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  /**
   * Salts and hashes plaintext password.
   *
   * @param password
   *          plaintext password to hash
   *
   * @return hashed and salted password
   */
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }
}

export default function getDefaultEncryptService(): IEncryptService {
  return new BcryptEncryptService();
}
