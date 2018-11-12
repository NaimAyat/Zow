import mongoose, {Schema} from 'mongoose';
let Schema = mongoose.Schema

let AnswerSchema : Schema  = new Schema({
  question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true},
  value: {type: String, required: true}
})

const Answer = mongoose.model('Answer', AnswerSchema)
export default Answer