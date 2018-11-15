import mongoose, { Document } from "mongoose";
import { IUser } from "../../entities";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

interface IUserModel extends IUser, Document {}
const User = mongoose.model<IUserModel>("User", UserSchema);
export default User;
