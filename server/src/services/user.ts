export interface IUserService {
  findUserByUsernameAndPassword(username: string, password: string);
  findUserById(id: string);
  newUser(username: string, password: string);
}

class DatabaseUserService implements IUserService {
  public findUserByUsernameAndPassword(username: string, password: string) {
    // TODO
  }
  public findUserById(id: string) {
    // TODO
  }
  public newUser(username: string, password: string) {
    // TODO
  }
}

export default function getDefaultUserService(): IUserService {
  return new DatabaseUserService();
}
