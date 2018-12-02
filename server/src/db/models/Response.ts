import mongoose, { Document } from "mongoose";
import { IResponse } from "../../entities";

const ResponseSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    answers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },
    scoring: {
      type: [
        {
          score: { type: Number, required: true },
          notes: { type: String },
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
          }
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

interface IResponseModel extends IResponse, Document {}
const Response = mongoose.model<IResponseModel>("Response", ResponseSchema);
export default Response;
