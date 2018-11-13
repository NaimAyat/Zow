import { IConfig } from "../config";
import * as models from "./models";
import mongoose from "mongoose";

export { models };

export function connectDb(config: IConfig): void {
  mongoose.connect(
    config.getDbUri(),
    err => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to MongoDB");
      }
    }
  );
}

export default {
  models,
  connectDb
};
