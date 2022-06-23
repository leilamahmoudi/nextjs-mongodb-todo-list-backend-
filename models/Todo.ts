import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

interface ITodo extends Document {
  title: string;
  description?: string;
}
export default mongoose.model<ITodo>("Todo", todoSchema);
