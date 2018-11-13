import { IAuthorizationService } from "../services/auth";

export default function getResolvers(authService: IAuthorizationService) {
  return {
    Query: {
      async currentUser(parent, args, ctx) {
        console.log(ctx.session);
        return ctx.session.user;
      }
    },
    Mutation: {
      async login(parent, args, ctx): Promise<boolean> {
        const { email, password } = args;
        return await authService.login(ctx, args.email, args.password);
      },
      async newUser(parent, args, ctx): Promise<boolean> {
        const { name, email, password } = args;
        return await authService.newUser(ctx, name, email, password);
      },
      async logout(parent, args, ctx): Promise<boolean> {
        await authService.logout(ctx);
        return true;
      }
    }
  };
}
