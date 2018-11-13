import { IAuthorizationService } from "../services/auth";

export default function getResolvers(authService: IAuthorizationService) {
  return {
    Query: {
      // Authentication
      async currentUser(parent, args, ctx): Promise<IUser> {
        console.log(ctx.session);
        return ctx.session.user;
      },
      // Form Service
      async form(parent, args, ctx) {
        const { formID } = args;
        return await formService.getFormsByID(ctx, formID);
      },
      async forms(parent, args, ctx) {
        const { user } = args;
        return await formService.getFormsByUser(ctx, user);
      }
    },
    Mutation: {
      // Authentication Service
      async login(parent, args, ctx): Promise<boolean> {
        const { email, password } = args;
        return await authService.login(ctx, email, password);
      },
      async newUser(parent, args, ctx): Promise<boolean> {
        const { name, email, password } = args;
        return await authService.newUser(ctx, name, email, password);
      },
      async logout(parent, args, ctx): Promise<boolean> {
        await authService.logout(ctx);
        return true;
      },
      // User Service
      async createForm(parent, args, ctx) {
        return await formService.createNewForm(ctx.session.user);
      },
      async addResponse(parent, args, ctx) {
        const { formID, response } = args;
        return await formService.addResponse(ctx, formID, response);
      },
      async addOwner(parent, args, ctx) {
        const { formID, userID } = args;
        return await formService.addOwner(ctx, formID, userID);
      }
    }

    Form: {
      async questions(form) {
        return await formService.getQuestions(ctx, form.id);
      },
      async responses(form) {
        return await formService.getResponses(ctx, form.id);
      },
    }
  };
}
