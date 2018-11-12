import mongoose, {Schema} from 'mongoose';
let Schema = mongoose.Schema

let ResponseSchema : Schema = new Schema({
  respondent: {type: String, required: true},
  answers: {type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Answer' }], required: true},
  scoring: {type: [{
    score: {type: Number, required: true},
    notes: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
  }]}
  },
  {
  timestamps: true
})

const Response = mongoose.model('Response', ResponseSchema)
export default Response