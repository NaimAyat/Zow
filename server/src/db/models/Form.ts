import mongoose, { Document } from "mongoose";
import { IForm } from "../../entities";

const FormSchema = new mongoose.Schema({
  owners: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: true
  },
  questions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    required: true
  },
  responses: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }],
    required: true,
    default: []
  },
  interviewSlots: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "InterviewSlot" }],
    required: true,
    default: []
  }
});

interface IFormModel extends IForm, Document {}
const Form = mongoose.model<IFormModel>("Form", FormSchema);
export default Form;
