import mongoose, {Schema} from 'mongoose';
let Schema = mongoose.Schema

let UserSchema : Schema = new Schema({
  name: {type: String},
  email: {type: String, required: true},
  passwordHash: {type: String, required: true}
})

const User = mongoose.model('User', UserSchema)
export default User