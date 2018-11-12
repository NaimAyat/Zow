import { IUser } from "../entities";

export interface IUserService {
  findUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<IUser>;
  findUserById(id: string): Promise<IUser>;
  newUser(username: string, password: string): Promise<IUser>;
}

class DatabaseUserService implements IUserService {
  public async findUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<IUser> {
    // TODO
    return null;
  }
  public async findUserById(id: string): Promise<IUser> {
    // TODO
    return null;
  }
  public async newUser(username: string, password: string): Promise<IUser> {
    // TODO
    return null;
  }
}

export default function getDefaultUserService(): IUserService {
  return new DatabaseUserService();
}
