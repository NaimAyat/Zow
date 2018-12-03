import mongoose, { Document } from "mongoose";
import { IInterviewSlot } from "../../entities";

const InterviewSlotSchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  available: { type: Boolean, required: true, default: true },
  intervieweeEmail: { type: String }
});

interface IInterviewSlotModel extends IInterviewSlot, Document {}
const InterviewSlot = mongoose.model<IInterviewSlotModel>(
  "InterviewSlot",
  InterviewSlotSchema
);

export default InterviewSlot;
