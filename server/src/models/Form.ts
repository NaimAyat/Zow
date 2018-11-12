import mongoose, {Schema} from 'mongoose';
let Schema = mongoose.Schema

let FormSchema : Schema = new Schema({
  owners: {type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User'}], required: true},
  questions: {type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Question' }], required: true},
  responses: {type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Response' }], required: true, default: [] },
  interviewSlots: {type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'InterviewSlot' }], required: true, default: []},
})

const Form = mongoose.model('Form',FormSchema);
export default Form