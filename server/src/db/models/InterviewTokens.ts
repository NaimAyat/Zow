import mongoose, { Document } from "mongoose";
import crypto from "crypto";
import { IForm } from "../../entities";

export interface IInterviewToken {
  token: string;
  userEmail: string;
  claimedSlot: boolean;
  form: IForm;
}

const InterviewTokenSchema = new mongoose.Schema({
  token: String,
  userEmail: String,
  claimedSlot: { type: Boolean, default: false },
  form: { type: mongoose.Schema.Types.ObjectId, ref: "Form" }
});

interface IInterviewTokenModel extends IInterviewToken, Document {}
const InterviewToken = mongoose.model<IInterviewTokenModel>(
  "InterviewToken",
  InterviewTokenSchema
);

export async function newInterviewToken(
  userEmail: string,
  formID: string
): Promise<string> {
  const token = await InterviewToken.create({
    token: crypto.randomBytes(16).toString("ascii"),
    userEmail,
    claimedSlot: false,
    form: formID
  });

  return token.id;
}
export default InterviewToken;
