import { Schema, Document, model } from "mongoose";

interface IChapter extends Document {
  bookID: string;
  number: number;
  content: string;
}

const ChapterSchema = new Schema({
  bookId: { type: String, required: true, index: true },
  number: { type: Number },
  content: { type: String, required: true },
});

ChapterSchema.index({ _id: 1, bookID: 1 }, { unique: true });

const Chapter = model<IChapter>("chapter", ChapterSchema);

export default Chapter;
