import mongoose, {Schema} from 'mongoose';
let Schema = mongoose.Schema

// TODO move those enum values to constants somewhere
let QuestionSchema : Schema = new Schema({
  prompt: {type: String, required: true},
  options: {type: [String]},
  type: {type: String, enum: ['CHOICE', 'TEXT'], required: true}
})

const Question = mongoose.model('Question', QuestionSchema)
export default Question