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
  /**
   * Retrieves an IUser matching provided username/password.
   * Compares provided password with hashed password in database.
   *
   * @param username
   *          name of user to retrieve
   * @param password
   *          password of user to retrieve
   *
   * @return IUser matching credentials
   * @throws "User not found" if no matching user
   */
  public async findUserByUsernameAndPassword(
    ctx: Context,
    username: string,
    password: string
  ): Promise<IUser> {
    // TODO
    return null;
  }

  /**
   * Retrieves an IUser matching provided ID.
   *
   * @param id
   *          id of user to retrieve
   *
   * @return IUser matching ID
   * @throws "User not found" if no matching user
   */
  public async findUserById(ctx: Context, id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("user not found");
    }

    return user;
  }
  /**
   * Creates a new user with the given username and password.
   * Hashes password with Encryption Service before entering in database.
   *
   * @param username
   *          username of new user
   * @param password
   *          password of new user
   *
   * @return void
   */
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
