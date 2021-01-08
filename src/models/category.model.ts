import { Document, model, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  description: string;
  image: string;
  count: number;
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  count: { type: Number, required: true, default: 0 },
});

const Category = model<ICategory>("category", CategorySchema);

export default Category;
