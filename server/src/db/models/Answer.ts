import mongoose, { Schema, Document } from "mongoose";
import { IAnswer } from "../../entities";

const AnswerSchema: Schema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  value: { type: String, required: true }
});

interface IAnswerModel extends IAnswer, Document {}
const Answer = mongoose.model<IAnswerModel>("Answer", AnswerSchema);
export default Answer;
