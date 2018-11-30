import Koa from "koa";
import { IConfig } from "../config";
import { User } from "../db/models";
import { IEncryptService } from "./encrypt";

export interface IAuthorizationService {
  newUser(
    ctx: Koa.Context,
    name: string,
    email: string,
    password: string
  ): Promise<boolean>;
  login(ctx: Koa.Context, email: string, password: string): Promise<boolean>;
  logout(ctx: Koa.Context): Promise<void>;
}

class SessionAuthorizationService implements IAuthorizationService {
  private config: IConfig;
  private encryptService: IEncryptService;
  constructor(config: IConfig, encryptService: IEncryptService) {
    this.config = config;
    this.encryptService = encryptService;
  }
  /**
   * Creates new user in database.
   * @param name
   *          username
   * @param email
   *          e-mail address for new user
   * @param password
   *          password for new user
   * @return true if successful creation, false otherwise
   */
  public async newUser(
    ctx: Koa.Context,
    name: string,
    email: string,
    password: string
  ): Promise<boolean> {
    if (!name || !email || !password) {
      return false;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return false;
    }

    const passwordHash = await this.encryptService.hashPassword(password);
    const user = await User.create({ name, email, password: passwordHash });
    ctx.session.user = { email: user.email, id: user.id };
    return true;
  }

  /**
   * Logs in user and creates a session.
   * @param email
   *          e-mail address for user
   * @param password
   *          password for user
   * @return true if successful login, false otherwise
   */
  public async login(
    ctx: Koa.Context,
    email: string,
    password: string
  ): Promise<boolean> {
    const user = await User.findOne({ email });
    if (user) {
      if (await this.encryptService.testPassword(password, user.password)) {
        ctx.session.user = { email: user.email, id: user.id };
        return true;
      }
    }

    ctx.session.user = null;
    return false; // failed to login
  }

  /**
   * Logs out user if a session is currently active.
   *
   * @return void
   */
  public async logout(ctx: Koa.Context): Promise<void> {
    ctx.session.user = null;
  }
}

export default function getDefaultAuthorizationService(
  config: IConfig,
  encryptService: IEncryptService
) {
  return new SessionAuthorizationService(config, encryptService);
}
