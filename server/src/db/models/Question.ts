import mongoose, { Document } from "mongoose";
import { IQuestion } from "../../entities";

const questionTypes = [
  "SHORT_TEXT",
  "LONG_TEXT",
  "PHONE",
  "EMAIL",
  "DROPDOWN",
  "CHECKBOX",
  "RADIO",
  "FILE"
];

// TODO move those enum values to constants somewhere
const QuestionSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  options: { type: [String] },
  type: { type: String, enum: questionTypes, required: true }
});

interface IQuestionModel extends IQuestion, Document {}
const Question = mongoose.model<IQuestionModel>("Question", QuestionSchema);
export default Question;
