import mongoose, { Document } from "mongoose";
import { IForm } from "../../entities";
import Question from "./Question";

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  owners: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: true
  },
  questions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    default: []
  },
  responses: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }],
    default: []
  },
  interviewSlots: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "InterviewSlot" }],
    default: []
  },
  published: {
    type: Boolean,
    default: false
  }
});

interface IFormModel extends IForm, Document {}
const Form = mongoose.model<IFormModel>("Form", FormSchema);

// TODO: Remove, this is only for testing
(async () => {
  let form = await Form.findOne({ name: "test Form" });
  if (!form) {
    const question = await Question.create({
      prompt: "Test",
      type: "SHORT_TEXT"
    });
    form = await Form.create({
      name: "test Form",
      owners: [],
      questions: [question]
    });
  }

  console.log("NEW FORM:", form.id);
})();

export default Form;
