import { Document, model, Schema } from "mongoose";
import { Tracing } from "trace_events";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export const userSchema = new Schema({
  name: { type: String, minlength: 2, required: true },
  email: { type: String, required: true },
  password: { type: String, minlength: 5, required: true },
  books: { type: Array, required: true, default: [] },
  balance: { type: Number, required: true, default: 100000 },
});

const User = model<IUser>("users", userSchema);

export default User;
