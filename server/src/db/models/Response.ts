import mongoose, { Schema, Document } from "mongoose";
import { IResponse } from "../../entities";

const ResponseSchema: Schema = new Schema(
  {
    respondent: { type: String, required: true },
    answers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
      required: true
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
