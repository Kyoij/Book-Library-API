import { Schema, Document, model } from "mongoose";
import Book from "./book.model";

interface IChapter extends Document {
  name: string;
  bookId: string;
  number: number;
  content: string;
}

const ChapterSchema = new Schema({
  name: { type: String, required: true },
  bookId: { type: String, required: true, index: true },
  number: { type: Number, required: true },
  content: { type: String, required: true },
});

ChapterSchema.index({ bookId: 1 });

ChapterSchema.pre<IChapter>("validate", function (next) {
  if (!this.isNew) return;
  Chapter.find({ bookId: this.bookId })
    .then((chapters) => {
      this.number = chapters.length + 1;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

ChapterSchema.pre<IChapter>("save", function (next) {
  if (!this.isNew) return next();
  Book.findById(this.bookId)
    .then((book) => {
      if (!book) return next();
      book.chapters.push(this._id);
      book.save();
      next();
    })
    .catch(next);
});

const Chapter = model<IChapter>("chapter", ChapterSchema);

export default Chapter;
