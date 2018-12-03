import { IAuthorizationService } from "../services/auth";
import { IUser, IInterviewSlot } from "../entities";
import { IFormService } from "../services/form";
import { IUserService } from "../services/user";
import { newInterviewToken } from "../db/models/InterviewTokens";

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
       * @return IForms for given user
       */
      async ownedForms(parent, args, ctx) {
        return await formService.getOwnedForms(ctx);
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
      },

      async getInterviewSlots(parent, args, ctx): Promise<IInterviewSlot[]> {
        const { token } = args;
        return await formService.getInterviewSlots(ctx, token);
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
       * @return the newly created form's id
       */
      async createForm(parent, args, ctx) {
        const form = await formService.createNewForm(ctx, ctx.session.user);
        return form.id;
      },
      /**
       * Adds a response for the provided form.
       * @param formID
       *          ID of form
       * @param answers
       *          answers to questions for response
       * @return boolean
       */
      async addResponse(parent, args, ctx) {
        const { formID, answers, email } = args;
        await formService.addResponse(ctx, formID, email, answers);
        return true;
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
        await formService.addOwner(ctx, formID, userID);
        return true;
      },

      /**
       * Saves form.
       * @param formID
       *          ID of form to save
       * @param score
       *          form content
       * @return void
       */
      async saveForm(parent, args, ctx) {
        const { formID, form } = args;
        form.id = formID;
        await formService.saveForm(ctx, form);
        return true;
      },

      /**
       * Adds score to given response.
       * @param responseID
       *          ID of response
       * @param score
       *          score to add to response
       * @return updated response
       */
      async addScore(parent, args, ctx) {
        const { responseID, score, notes } = args;
        await formService.addScore(ctx, responseID, score, notes);
        return true;
      },

      /**
       * Gets average score for given response.
       * @param responseID
       *          ID of response
       *
       * @return average score
       */
      async getAvgScore(parent, args, ctx) {
        const { responseID } = args;
        return await formService.getAvgScore(ctx, responseID);
      },

      /**
       * Publishes or upublishes a form to the public
       * @param formID form to publish
       * @param published new publish state
       */
      async setPublishState(parent, args, ctx) {
        const { formID, published } = args;
        await formService.setPublishState(ctx, formID, published);
        return true;
      },

      async addInterviewSlot(parent, args, ctx) {
        const { formID, startTime, endTime } = args;
        return await formService.addInterviewSlot(
          ctx,
          formID,
          startTime,
          endTime
        );
      },

      async removeInterviewSlot(parent, args, ctx) {
        const { formID, slotID } = args;
        return await formService.removeInterviewSlot(ctx, formID, slotID);
      },

      async claimInterviewSlot(parent, args, ctx) {
        const { slotID, token } = args;
        return await formService.claimInterviewSlot(ctx, slotID, token);
      },

      async requestInterviewFrom(parent, args, ctx) {
        const { formID, userEmail } = args;
        await formService.requestInterviewFrom(ctx, formID, userEmail);
        return true;
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
