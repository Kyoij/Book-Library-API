import { string } from "joi";
import { model, Schema } from "mongoose";

const JWTSchema = new Schema({});

const JWT = model("JWTs", JWTSchema);

export default JWT;
