import mongoose, { Document } from "mongoose";
import { IUser } from "../../entities";
import getDefaultAuthorizationService from "../../services/auth";
import getDefaultEncryptService from "../../services/encrypt";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

interface IUserModel extends IUser, Document {}
const User = mongoose.model<IUserModel>("User", UserSchema);
export default User;

// TODO: Remove, this is only for testing
(async () => {
  let user = await User.findOne({ email: "testuser" });
  if (!user) {
    user = await User.create({
      name: "test user",
      email: "testuser",
      password: await getDefaultEncryptService().hashPassword("testpass")
    });
  }

  console.log("NEW USER, email:", user.email, "passhash:", user.password);
})();
