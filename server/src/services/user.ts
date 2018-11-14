import { IUser } from "../entities";
import { User } from "../db/models";
import { Context } from "koa";

export interface IUserService {
  findUserByUsernameAndPassword(
    ctx: Context,
    username: string,
    password: string
  ): Promise<IUser>;
  findUserById(ctx: Context, id: string): Promise<IUser>;
  newUser(ctx: Context, username: string, password: string): Promise<IUser>;
}

class DatabaseUserService implements IUserService {
  public async findUserByUsernameAndPassword(
    ctx: Context,
    username: string,
    password: string
  ): Promise<IUser> {
    // TODO
    return null;
  }
  public async findUserById(ctx: Context, id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("user not found");
    }

    return user;
  }
  public async newUser(
    ctx: Context,
    username: string,
    password: string
  ): Promise<IUser> {
    // TODO
    return null;
  }
}

export default function getDefaultUserService(): IUserService {
  return new DatabaseUserService();
}
