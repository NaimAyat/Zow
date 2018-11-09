import mongoose, {Schema} from 'mongoose';

// Recruiter accounts
let UserSchema : Schema = new Schema({
  name: String,
  email: String,
  password: String
})

// Questions
let QuestionSchema : Schema = new Schema({
  prompt: String,
  options: [String],
  type: String
})

// Answers
// TODO should this be a separate schema or embedded?
let AnswerSchema : Schema  = new Schema({
  question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
  value: String
})

// Response
let ResponseSchema : Schema = new Schema({
  respondent: String,
  answers: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  scoring: {
    score: Number,
    notes: String
  },
  timestamps: true
})

let InterviewSlotSchema: Schema = new Schema({
  start: Date,
  end: Date,
  available: Boolean,
  email: String
})

let FormSchema : Schema = new Schema({
  owners: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  questions: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  responses: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Response' }],
  slots: [{ type : mongoose.Schema.Types.ObjectId, ref: 'InterviewSlot' }],
})

