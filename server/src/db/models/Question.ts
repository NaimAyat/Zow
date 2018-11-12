import mongoose, {Schema} from 'mongoose';
let Schema = mongoose.Schema

const questionTypes = ['SHORT_TEXT', 'LONG_TEXT', 'PHONE', 'EMAIL', 'DROPDOWN', 'CHECKBOX', 'RADIO', 'FILE']

// TODO move those enum values to constants somewhere
let QuestionSchema : Schema = new Schema({
  prompt: {type: String, required: true},
  options: {type: [String]},
  type: {type: String, enum: questionTypes, required: true}
})

const Question = mongoose.model('Question', QuestionSchema)
export default Question