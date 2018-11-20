import { IAuthorizationService } from "../services/auth";
import { IUser } from "../entities";
import { IFormService } from "../services/form";
import { IUserService } from "../services/user";

export default function getResolvers(
  authService: IAuthorizationService,
  formService: IFormService,
  userService: IUserService
) {
  return {
    Query: {
      ////////////////////
      // Authentication //
      ////////////////////
      /**
       * Retrieves the currently logged in user.
       *
       * @return currently logged in user
       */
      async currentUser(parent, args, ctx): Promise<IUser> {
        console.log(ctx.session);
        return ctx.session.user;
      },
      //////////////////
      // Form Service //
      //////////////////
      /**
       * Retrieves a form given a form ID.
       * @param formID
       *          ID of form to retrieve
       * @return IForm for given ID
       */
      async form(parent, args, ctx) {
        const { formID } = args;
        return await formService.getFormByID(ctx, formID);
      },
      /**
       * Retrieves all forms for a given user.
       * @param user
       *          user for which forms are retrieved
       * @return IForms for given user
       */
      async forms(parent, args, ctx) {
        const { user } = args;
        return await formService.getFormsByUser(ctx, user);
      },
      //////////////////
      // User Service //
      //////////////////
      /**
       * Retrieves a user given a user ID.
       * @param userID
       *          ID of user to retrieve
       * @return IUser for given ID
       */
      async user(parent, args, ctx) {
        const { userID } = args;
        return await userService.findUserById(ctx, userID);
      }
    },

    Mutation: {
      ////////////////////////////
      // Authentication Service //
      ////////////////////////////
      /**
       * Authenticates and logs in a user.
       * @param email
       *          email address of user
       * @param password
       *          password of user
       * @return true if successful login, false otherwise
       */
      async login(parent, args, ctx): Promise<boolean> {
        const { email, password } = args;
        return await authService.login(ctx, email, password);
      },
      /**
       * Creates a new user.
       * @param name
       *          name of user
       * @param email
       *          email address of user
       * @param password
       *          password of user
       * @return true if successful creation, false otherwise
       */
      async newUser(parent, args, ctx): Promise<boolean> {
        const { name, email, password } = args;
        return await authService.newUser(ctx, name, email, password);
      },
      /**
       * Logs out the current user.
       *
       * @return true if successful logout, false otherwise
       */
      async logout(parent, args, ctx): Promise<boolean> {
        await authService.logout(ctx);
        return true;
      },
      //////////////////
      // Form Service //
      //////////////////
      /**
       * Creates a form for the currently logged in user.
       *
       * @return the newly created IForm
       */
      async createForm(parent, args, ctx) {
        return await formService.createNewForm(ctx, ctx.session.user);
      },
      /**
       * Adds a response for the provided form.
       * @param formID
       *          ID of form
       * @param answers
       *          answers to questions for response
       * @return void
       */
      async addResponse(parent, args, ctx) {
        const { formID, answers } = args;
        return await formService.addResponse(ctx, formID, answers);
      },
      /**
       * Adds an owner to the provided form.
       * @param formID
       *          ID of form
       * @param userID
       *          owner to add to form
       * @return void
       */
      async addOwner(parent, args, ctx) {
        const { formID, userID } = args;
        return await formService.addOwner(ctx, formID, userID);
      }
    },

    Form: {
      /**
       * Retrieves questions for given form.
       * @param form
       *          form as provided by top level query
       * @return all associated IQuestions
       */
      async questions(form, args, ctx) {
        return await formService.getQuestions(ctx, form.id);
      },
      /**
       * Retrieves responses for given form.
       * @param form
       *          form as provided by top level query
       * @return all associated IResponses
       */
      async responses(form, args, ctx) {
        return await formService.getResponses(ctx, form.id);
      }
    }
  };
}
