import mongoose, {Schema} from 'mongoose';
let Schema = mongoose.Schema

let InterviewSlotSchema: Schema = new Schema({
  start: {type: Date, required: true},
  end: {type: Date, required: true},
  available: {type: Boolean, required: true, default: true},
  intervieweeEmail: {type: String}
})

const InterviewSlot = mongoose.model('InterviewSlot', InterviewSlotSchema)
export default InterviewSlot