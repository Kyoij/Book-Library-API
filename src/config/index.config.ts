import { config } from "dotenv";

config();

export const port = Number(process.env.PORT);
export const mongo_url = process.env.MONGO_URL as string;
export const secret = process.env.SECRET as string;
