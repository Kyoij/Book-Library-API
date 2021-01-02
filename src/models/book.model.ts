import { Document, model, Schema } from "mongoose";

const BookSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: Array, required: true },
});

const Book = model("books", BookSchema);
export type BookDocument<T = any> = Document<T> & { name: string; author: string; content: any[] };

export default Book;
