import mongoose, { Document } from "mongoose";
import { IAnswer } from "../../entities";

const AnswerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  value: { type: String, default: "" }
});

interface IAnswerModel extends IAnswer, Document {}
const Answer = mongoose.model<IAnswerModel>("Answer", AnswerSchema);
export default Answer;
